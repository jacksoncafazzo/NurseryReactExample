import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import SwipeableViews from 'react-swipeable-views';
import { browserHistory } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectTab, consumePlants } from '../actions/index';
import { fetchUser } from '../actions/firebase_actions';

import { Card } from 'material-ui/Card';
import { Tabs, Tab } from 'material-ui/Tabs';

import LinearProgress from 'material-ui/LinearProgress';
//import Star from 'material-ui/svg-icons/action/stars'

import CatalogSection from './catalog-section';
import CatalogSearch from './catalog-search';

import firebase from 'firebase';
import {colors} from 'material-ui/styles';

import '../../styles/catalog-index.css';

const plantsRef = firebase.database().ref('plants');
const catalogRef = firebase.database().ref('catalog');

const styles = {
  tabs: {
    width: '100%'
  },
  default_tab:{
    color: colors.white,
    background: [
    `linear-gradient(${colors.lightGreen500}, ${colors.green500})`,

    // fallback
    colors.lightGreen500,
    ],
    fontWeight: 700,
  },
  active_tab:{
    color: colors.yellowA200,
    borderColor: colors.yellowA200
  },
  inkBarStyle: {
    background: colors.amber500
  },
};

class CatalogIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      plantsSlideIndex: 0,
      fakeSlideIndex: 2,
      renderArray: [],
      menuRender: null,
      loaded: false,
      plants: {
        initialSnap: true,
        sections: {}
      },
      searchRequest: 'PREMIUMS',
      searchRequests: [],
    }
  }

  componentWillMount() {
    plantsRef.once('value', (snapshot) => {
      console.log('u went to get the plants');
      let plants = snapshot.val();
      if (!plants && this.props.currentUser.email === 'doctorjuno@gmail.com') {
        console.log('plants is empty');
        plants = { sections: {}};
        // Get all the plants and create a list of sectionNames
        catalogRef.orderByChild('PRODUCT GROUP').once('value').then((snapshot) => {
          let sectionNames = Object.keys(plants.sections);
          let allPlants = snapshot.val();

          allPlants.forEach((plant, key) => {
            let plantSectionName = plant['PRODUCT GROUP'];
            let plantGenusName = plant['Genus'].trim();

            if (!plantGenusName) {
              console.log('DOOOOD the genus is blank', plant);
            }

            let isInSection = sectionNames.includes(plantSectionName);

            if (!isInSection) {
              sectionNames.push(plantSectionName);
              plants.sections[plantSectionName] = {
                initialSnap: true,
                genera: {
                  [plantGenusName]: {
                    initialSnap: true,
                    varieties: {
                      [key]: {}
                    }
                  }
                },
              };
              plants.initialSnap = true;
            }
            //if in section ends

          });
          //allplants loop ends
          console.log('init snap', plants);

          //save to firebase
          let loaded = this.savePlantsToFirebase(plants);
          if (loaded) {
            //set the tabs and state
            let menuRender = this.renderSectionTabs(Object.keys(plants.sections));
            let tabDivRender = this.renderTabDivs(plants);
            this.setState({
              plants: plants,
              menuRender: menuRender,
              tabDivRender: tabDivRender,
              loaded: true,
            });
          }
        });
        } else {
          //plants is valid and not initialSnap
          
          console.log('ths snap', plants);

          let menuRender = this.renderSectionTabs(Object.keys(plants.sections));
          let tabDivRender = this.renderTabDivs(plants);
          this.setState({
            plants: plants,
            menuRender: menuRender,
            tabDivRender: tabDivRender,
            loaded: true
          });
        }
    });
  }


  savePlantsToFirebase(plants) {
    plantsRef.set(plants)
      .then(() => {
        console.log('successful save!!', plants);
        return true;
      })
      .catch((error) => {
        console.log('save failed', error.message);
        return false;
      });
  }

  getPlantsByGenusName(searchRequest = '') {
    // if (searchRequest !== '') {
    //   ref.orderByChild('Genus')
    //     .startAt(searchRequest)
    //     .endAt(searchRequest)
    //     .once('value')
    //     .then((snapshot) => {
    //       console.log('snapshot', snapshot.val());
    //     });
    // }
  }

  getPlantsBySection(sectionName, searchRequest = '') {
    // let {plants, searchRequests, catalogKeys} = this.state;
    // if (searchRequests.includes(searchRequest) && (searchRequest)) {
    //   console.log('u already searched for that');
    //   return
    // } else {
    //   //new search!
    //   searchRequests.push(searchRequest);
    //   this.setState({ searchRequests: searchRequests });
    //
    //   //set a listener for that product group
    //   ref.orderByChild('PRODUCT GROUP').equalTo(searchRequest).on('value', (snapshot) => {
    //     let { plants } = this.state;
    //     let plantsBySection = snapshot.val();
    //     if (!plantsBySection) {
    //       console.log('database doesnt have that product group');
    //     } else {
    //       let sectionName = searchRequest;
    //       let varietyNames = [];
    //       let genusNames = [];
    //       plantsBySection.forEach((plant) => {
    //         let plantGenusName = plant['Genus'].trim();
    //         let plantVarietyName = plant['Variety'].trim();
    //         let hasSection = Object.keys(plants).includes(sectionName);
    //
    //         if (hasSection) {
    //           //plants has the section, see if it has the genus
    //           let hasGenus = Object.keys(plants[sectionName]).includes(plantGenusName);
    //
    //           if (!hasGenus) {
    //             //plants doesn't have the genus
    //             plants[sectionName][plantGenusName] = {};
    //             genusNames.push(plantGenusName);
    //
    //             // if the plant is a base genus, it doesn't seem to have a variety but it has a variety 2
    //             let wasBaseGenus = false;
    //             if (plantVarietyName === null) {
    //               plantVarietyName = plant['Variety 2'].trim();
    //               wasBaseGenus = true;
    //             }
    //             if (wasBaseGenus) {
    //               //make the base genus a variety and set the genus description
    //               plants[sectionName][plantGenusName][plantVarietyName] = [plant];
    //               plants[sectionName][plantGenusName]['Description'] = plant['Description'];
    //
    //               //add the scientific name to varietyNames with the nice Genus 2 name
    //               varietyNames.push(`${plant['Genus 2'].trim()} ${plantVarietyName}`);
    //             } else {
    //               //it's not a base genus so we'll do the same for variety but don't alter genus description
    //               plants[sectionName][plantGenusName][plantVarietyName] = [plant];
    //               varietyNames.push(`${plant['Genus 2'].trim()} ${plantVarietyName}`);
    //             }
    //           } else {
    //             //plants has genus
    //             // if the plant is a base genus, it doesn't seem to have a variety but it has a variety 2
    //             let wasBaseGenus = false;
    //             if (plantVarietyName === null) {
    //               plantVarietyName = plant['Variety 2'].trim();
    //               wasBaseGenus = true;
    //             }
    //
    //             //see if it plants has the variety
    //             let hasVariety = Object.keys(plants[sectionName][plantGenusName]).includes(plantVarietyName);
    //             if (!hasVariety) {
    //               if (wasBaseGenus) {
    //                 //make the base genus a variety and set the genus description
    //                 plants[sectionName][plantGenusName][plantVarietyName] = [plant];
    //
    //                 //write the genus description
    //                 plants[sectionName][plantGenusName]['Description'] = plant['Description'];
    //
    //                 //add the scientific name to varietyNames with the nice Genus 2 name
    //                 varietyNames.push(`${plant['Genus 2'].trim()} ${plantVarietyName}`);
    //               } else {
    //                 //it's not a base genus so we'll do the same for variety but don't alter genus description
    //                 plants[sectionName][plantGenusName][plantVarietyName] = [plant];
    //                 varietyNames.push(`${plant['Genus 2'].trim()} ${plantVarietyName}`);
    //               }
    //             } else {
    //               //plants has the variety
    //               // it's a genus, push it to the array on the variety name
    //               plants[sectionName][plantGenusName][plantVarietyName].push(plant);
    //             }
    //           }
    //         } else {
    //           //plants doesn't have that section ...yet
    //           genusNames.push(plantGenusName);
    //           plants[sectionName] = {
    //             [plantGenusName]: {}
    //           };
    //           let wasBaseGenus = false;
    //           if (plantVarietyName === null) {
    //             //it's a base genus
    //             plantVarietyName = plant['Variety 2'];
    //             wasBaseGenus = true;
    //           }
    //           if (wasBaseGenus) {
    //             plants[sectionName][plantGenusName] = {
    //               Description: plant['Description'],
    //               [plantVarietyName]: [plant]
    //             };
    //           } else {
    //             //was regular variety
    //             plants[sectionName][plantGenusName][plantVarietyName] = [plant];
    //           }
    //           //add nice names to variety names
    //           varietyNames.push(`${plant['Genus 2'].trim()} ${plantVarietyName}`);
    //         }
    //       });
    //       // looping through plantsSection ends and all values should be filled in plants from this section, let's save the new plants
    //       this.setState({ plants: plants });
    //       console.log('plants', plants);
    //
    //       // snapshot callback ending, set the states
    //       catalogKeys['genusNames'] = genusNames
    //       catalogKeys['varietyNames'] = varietyNames;
    //
    //       this.setState({catalogKeys: catalogKeys });
    //
    //       //save the lists to database
    //       firebase.database().ref('catalogKeys').set(catalogKeys);
    //     }
    //   });
    //
    //   //you'll probably want to do something after this....
    //   // // create menu-tabs
    //   // let menuRender = this.renderTabDivs(sectionNames, plants);
    // }
  }

  componentWillReceiveProps() {
    console.log('did receive props', this.props.searchRequest);
  }

  componentWillUnmount() {

  }

  handleSearchRequest(searchRequest) {
    if (searchRequest.hasOwnProperty('sectionSearchRequest')) {
      this.getPlantsBySection(searchRequest.sectionSearchRequest);
      this.setState(searchRequest.sectionSearchRequest)
    }
  }



  renderSectionTabs(sections) {
    // console.log('your request', sections);
    let styles = {
      tabs: {
        width: '100%'
      },
      tab: {
        background: [
          `linear-gradient(${colors.green500}, ${colors.amber500})`,
          // fallback
          colors.lightGreen500,
        ],
        color: 'white',
        fontWeight: 'bold'
      }
    }


    if (sections.length > 0) {
      return (sections.map((key, i) => {
        return <Tab label={key} key={i} value={i} style={styles.tab} onTouchTap={this.handleSectionTabChange.bind(this)} />
      })
    );

    }
  }

  renderTabDivs(plants) {
    return Object.keys(plants.sections).map((key, i) => {
      return <CatalogSection title={key} section={plants.sections[key]} key={i} isInitialSnap={plants.initialSnap} />;
    });;
  }

  handleSectionTabChange(value) {
    this.setState({ plantsSlideIndex: value });
  }

  handleActive(tab) {
    this.props.selectTab(tab.props.value);
    browserHistory.push(tab.props['data-route']);
  }

  renderFakeTabs() {
    const tabNames = ['Home', 'About', 'Plants', 'Wholesale', 'Contact'];
    let tabArray = [];
    tabNames.forEach((tabName, i) => {
      if (i === 2) {
        tabArray.push(<Tab label={tabName} value={i}
          data-route='/catalog'
          onActive={this.handleActive.bind(this)}
          style={styles.default_tab}/>);
      } else {
        tabArray.push(<Tab label={tabName} onActive={this.handleActive.bind(this)} data-route='/' value={i} style={styles.default_tab}/>);
      }
    });
    return tabArray;
  }

  renderFakeTopTabs() {
    return (<Tabs
      onChange={this.handleChange}
      value={this.state.fakeSlideIndex}
      style={styles.tabs}
      className='menu-tabs'
      children={this.renderFakeTabs()}>
    </Tabs>)
  }

  render() {
    // const { dispatch, selectedSection, plants, isFetching } = this.props;
    let { plants, menuRender, tabDivRender, loaded } = this.state;

    return (
      <div className='catalog-index'>
        {this.renderFakeTopTabs()}
        <div className='section-tabs-container'>
        {(loaded) ?
          <div><Tabs
            onChange={this.handleSectionTabChange.bind(this)}
            value={this.state.plantsSlideIndex}
            style={styles.tabs}
            className='section-tabs'
            inkBarStyle={{backgroundColor: colors.yellow500}}
            children={menuRender} />
          <Card className='index-card'>
          <SwipeableViews
            index={this.state.plantsSlideIndex}
            onChangeIndex={this.handleSectionChange}
            children={tabDivRender} >
          </SwipeableViews>
        </Card>
        </div>
          : <div><LinearProgress size={2} color={colors.amber500} /></div>}
        </div>
      </div>
    );
  }
}

function mapStateToProps({currentUser, slideIndex}) {
  return {currentUser, slideIndex};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchUser, selectTab}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Radium(CatalogIndex));
