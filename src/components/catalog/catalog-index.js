import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import SwipeableViews from 'react-swipeable-views';
import { browserHistory } from 'react-router';

import { Card, CardHeader, CardText, CardTitle } from 'material-ui/Card';
import { Tabs, Tab } from 'material-ui/Tabs';
import { List, ListItem } from 'material-ui/List';
import LinearProgress from 'material-ui/LinearProgress';
import Star from 'material-ui/svg-icons/action/stars'

import CatalogSection from './catalog-section';
import CatalogSearch from './catalog-search';

import firebase from 'firebase';
import {colors} from 'material-ui/styles';

import '../../styles/catalog-index.css';

const ref = firebase.database().ref('catalogKeys');
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

const listStyles = {
  fontSize: '1.5em',
  fontWeight: 'bold'
}

class CatalogIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      plantsSlideIndex: 0,
      fakeSlideIndex: 2,
      renderArray: [],
      menuRender: null,
      sectionNames: null,
      searchRequest: 'PREMIUMS',
      searchRequests: [],
      plants: {},
      catalogKeys: null
    }
  }

  componentWillMount() {
    //See if there is a search request
    let {catalogKeys} = this.state;
    if (!catalogKeys) {
      console.log('catalogKeys.sectionNames is empty');
      ref.on('value', (snapshot) => {
        if (snapshot === null) {

          // Get all the plants and create a list of sectionNames
          ref.orderByChild('PRODUCT GROUP').once('value').then((snapshot) => {
            let sectionNames = [];
            let allPlants = snapshot.val();
            console.log('init snap', plantsSection);
            allPlants.forEach((plant) => {
              let plantSectionName = plant['PRODUCT GROUP'];
              let isInSection = sectionNames.includes(plantSectionName);
              if (!isInSection) {
                sectionNames.push(plantSectionName);
              }
            });
            //initial plants loop ends
            // get tab menu
            this.setState({ catalogKeys: {sectionNames} });
          });
        } else {
          //snapshot not null
          let catalogKeys = snapshot.val();
          console.log('ths snap', snapshot.val());

          let menuRender = this.renderSectionTabs(catalogKeys.sectionNames);
          this.setState({catalogKeys: catalogKeys, menuRender: menuRender});
        }
      });
    } else {
      // we already have keys
      console.log('we already have keys', catalogKeys);
      let menuRender = this.renderSectionTabs(catalogKeys.sectionNames);
      this.setState({menuRender: menuRender});
    }
  }

  componentWillUnmount() {
    firebase.database().ref().child('catalogKeys').off();
  }

  getPlantsByGenusName(searchRequest = '') {
    if (searchRequest !== '') {
      ref.orderByChild('Genus')
        .startAt(searchRequest)
        .endAt(searchRequest)
        .once('value')
        .then((snapshot) => {
          console.log('snapshot', snapshot.val());
        });
    }
  }

  getPlantsBySection(sectionName, searchRequest = '') {
    let {plants, searchRequests, catalogKeys} = this.state;
    if (searchRequests.includes(searchRequest) && (searchRequest)) {
      console.log('u already searched for that');
      return
    } else {
      //new search!
      searchRequests.push(searchRequest);
      this.setState({ searchRequests: searchRequests });

      //set a listener for that product group
      ref.orderByChild('PRODUCT GROUP').equalTo(searchRequest).on('value', (snapshot) => {
        let { plants } = this.state;
        let plantsBySection = snapshot.val();
        if (!plantsBySection) {
          console.log('database doesnt have that product group');
        } else {
          let sectionName = searchRequest;
          let varietyNames = [];
          let genusNames = [];
          plantsBySection.forEach((plant) => {
            let plantGenusName = plant['Genus'].trim();
            let plantVarietyName = plant['Variety'].trim();
            let hasSection = Object.keys(plants).includes(sectionName);

            if (hasSection) {
              //plants has the section, see if it has the genus
              let hasGenus = Object.keys(plants[sectionName]).includes(plantGenusName);

              if (!hasGenus) {
                //plants doesn't have the genus
                plants[sectionName][plantGenusName] = {};
                genusNames.push(plantGenusName);

                // if the plant is a base genus, it doesn't seem to have a variety but it has a variety 2
                let wasBaseGenus = false;
                if (plantVarietyName === null) {
                  plantVarietyName = plant['Variety 2'].trim();
                  wasBaseGenus = true;
                }
                if (wasBaseGenus) {
                  //make the base genus a variety and set the genus description
                  plants[sectionName][plantGenusName][plantVarietyName] = [plant];
                  plants[sectionName][plantGenusName]['Description'] = plant['Description'];

                  //add the scientific name to varietyNames with the nice Genus 2 name
                  varietyNames.push(`${plant['Genus 2'].trim()} ${plantVarietyName}`);
                } else {
                  //it's not a base genus so we'll do the same for variety but don't alter genus description
                  plants[sectionName][plantGenusName][plantVarietyName] = [plant];
                  varietyNames.push(`${plant['Genus 2'].trim()} ${plantVarietyName}`);
                }
              } else {
                //plants has genus
                // if the plant is a base genus, it doesn't seem to have a variety but it has a variety 2
                let wasBaseGenus = false;
                if (plantVarietyName === null) {
                  plantVarietyName = plant['Variety 2'].trim();
                  wasBaseGenus = true;
                }

                //see if it plants has the variety
                let hasVariety = Object.keys(plants[sectionName][plantGenusName]).includes(plantVarietyName);
                if (!hasVariety) {
                  if (wasBaseGenus) {
                    //make the base genus a variety and set the genus description
                    plants[sectionName][plantGenusName][plantVarietyName] = [plant];

                    //write the genus description
                    plants[sectionName][plantGenusName]['Description'] = plant['Description'];

                    //add the scientific name to varietyNames with the nice Genus 2 name
                    varietyNames.push(`${plant['Genus 2'].trim()} ${plantVarietyName}`);
                  } else {
                    //it's not a base genus so we'll do the same for variety but don't alter genus description
                    plants[sectionName][plantGenusName][plantVarietyName] = [plant];
                    varietyNames.push(`${plant['Genus 2'].trim()} ${plantVarietyName}`);
                  }
                } else {
                  //plants has the variety
                  // it's a genus, push it to the array on the variety name
                  plants[sectionName][plantGenusName][plantVarietyName].push(plant);
                }
              }
            } else {
              //plants doesn't have that section ...yet
              genusNames.push(genusName);
              plants[sectionName] = {
                [plantGenusName]: {}
              };
              let wasBaseGenus = false;
              if (plantVarietyName === null) {
                //it's a base genus
                plantVarietyName = plant['Variety 2'];
                wasBaseGenus = true;
              }
              if (wasBaseGenus) {
                plants[plantSectionName][plantGenusName] = {
                  Description: plant['Description'],
                  [plantVarietyName]: [plant]
                };
              } else {
                //was regular variety
                plants[plantSectionName][plantGenusName][plantVarietyName] = [plant];
              }
              //add nice names to variety names
              varietyNames.push(`${plant['Genus 2'].trim()} ${plantVarietyName}`);
            }
          });
          // looping through plantsSection ends and all values should be filled in plants from this section, let's save the new plants
          this.setState({ plants: plants });
          console.log('plants', plants);

          // snapshot callback ending, set the states
          catalogKeys['genusNames'] = genusNames
          catalogKeys['varietyNames'] = varietyNames;

          this.setState({catalogKeys: catalogKeys });

          //save the lists to database
          firebase.database().ref('catalogKeys').set(catalogKeys);
        }
      });
      // create menu-tabs
      let menuRender = this.renderTabDivs(sectionNames, plants);
    }
  }

  componentWillReceiveProps() {
    console.log('did receive props', this.props.searchRequest);
  }

  componentWillUnmount() {
    ref.off();
  }

  handleSearchRequest(searchRequest) {
    console.log('your request', searchRequest);
    if (searchRequest.hasOwnProperty('sectionSearchRequest')) {
      this.getPlantsBySection(searchRequest.sectionSearchRequest);
      this.setState(searchRequest.sectionSearchRequest)
    }
  }

  handleSectionTabChange = (value) => {
    this.setState({ plantsSlideIndex: value });
  }


  renderSectionTabs(sectionNames) {
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
    let renderArray = [];
    sectionNames.forEach((sectionName, i) => {
      renderArray.push(
        <Tab label={sectionName} key={i} value={i} style={styles.tab} onTouchTap={this.handleSectionTabChange.bind(this)}
           />
      );
    });
    return renderArray
  }

  renderTabDivs(sectionNames, plants) {
    let { catalogKeys } = this.state;
    let tabArray = [];
    catalogKeys.sectionNames.forEach((sectionName, i) => {
      tabArray.push(<CatalogSection title={sectionName} key={i} />);
    });
    tabArray.push(<div className='search'>
      <CatalogSearch {...this.props} key='search' catalogKeys={catalogKeys}
      handleSearchRequest={this.handleSearchRequest.bind(this)} /> </div>);
    return tabArray;
  }

  handleActive(tab) {
    browserHistory.push(tab.props['data-route']);
  }

  renderTabs() {
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
    let tabArray = [];
    return (<Tabs
      onChange={this.handleChange}
      value={this.state.fakeSlideIndex}
      style={styles.tabs}
      className='menu-tabs'
      children={this.renderTabs()}>
    </Tabs>)
  }

  render() {
    // const { dispatch, selectedSection, plants, isFetching } = this.props;
    let { catalogKeys, plants } = this.state;

    console.log('render index', catalogKeys, plants)
    let styles = {
      tabs: {
        color: 'black',
        fontWeight: 'bold',
        width: '100%',
      },
    };
    return (
      <div className='catalog-index'>
        {this.renderFakeTopTabs()}
        <div className='section-tabs-container'>
        {(catalogKeys) ?
          <Tabs
            onChange={this.handleSectionTabChange}
            value={this.state.plantsSlideIndex}
            style={styles.tabs}
            className='section-tabs'
            inkBarStyle={{backgroundColor: colors.red900}}
            children={this.renderSectionTabs(catalogKeys.sectionNames)} />
          : <div><LinearProgress size={2} color={colors.red900} /></div>}
        </div>
        <Card className='index-card'>
          {(catalogKeys && plants) ?
          <SwipeableViews
            index={this.state.plantsSlideIndex}
            onChangeIndex={this.handleSectionChange}
            children={this.renderTabDivs(catalogKeys.sectionNames, plants)} >
          </SwipeableViews>
          : <div>loading</div>}
      </Card>
      </div>
    );
  }
}

export default Radium(CatalogIndex);


// set plant listener for each section
// ** but do we need to ?? let's try it without
// catalogKeys.sectionNames.forEach((sectionName) => {
//   this.getPlantsBySection(sectionName);
// });
//render tabs

    // set listeners for plants by section..no wait, don't
    // sectionNames.forEach((sectionName) => {
    //   this.getPlantsBySection(sectionName);
    // });


  // ref.orderByChild('PRODUCT GROUP')
  // .on('value', (snapshot) => {
  //   //firebase snapshot callback
  //   let sectionNames = [];
  //
  //
  //     let plantGenusName = plant['Genus'].trim();
  //     let isInGenus = genusNames.indexOf(plantGenusName);
  //     let plantVarietyName = plant['Variety'].trim();
  //     let isInVariety = varietyNames.indexOf(plantVarietyName);
  //
  //
  //       if (isInGenus < 0) {
  //         genusNames.push(plantGenusName);
  //         plants[plantSectionName][plantGenusName] = {};
  //         if (plantVarietyName === null) {
  //           plants[plantSectionName][plantGenusName]['Description'] = plant['Description'];
  //           plants[plantSectionName][plantGenusName][plant['Variety 2']] = [plant];
  //           }
  //
  //         if (plantVarietyName !== null) {
  //           plants[plantSectionName][plantGenusName] = {
  //             [plantVarietyName]: [plant]
  //           };
  //         }
  //       } else {
  //         // plants has that genus
  //         if (isInVariety < 0) {
  //           if (plantVarietyName === null) {
  //             varietyNames.push(plant['Variety 2']);
  //             plants[plantSectionName][plantGenusName]['Description'] = plant['Description'];
  //             plants[plantSectionName][plantGenusName][plant['Variety 2']].push(plant);
  //           }
  //           if (plantVarietyName !== null) {
  //             varietyNames.push(plantVarietyName);
  //             plants[plantSectionName][plantGenusName][plant['Variety 2']].push(plant);
  //           }
  //         } else {
  //           // plants has that variety
  //           plants[plantSectionName][plantGenusName][plantVarietyName].push(plant);
  //         }
  //       }
  //     }
  //
  //   });

  // });
// snapshot not null?


  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.selectedSection !== this.props.selectedSection) {
  //     const { dispatch, selectedSection } = nextProps;
  //     dispatch(fetchPlantsIfNeeded(selectedSection));
  //   }
  // }

  // handleChange(nextSection) {
  //   this.props.dispatch(selectSection(nextSection))
  // }
  //
  // handleRefreshClick(e) {
  //   e.preventDefault()
  //
  //   const { dispatch, selectedSection } = this.props
  //   dispatch(invalidatePlants(selectedSection))
  //   dispatch(fetchPlantsIfNeeded(selectedSection))
  // }

  // renderSections() {
  //   let { sections } = this.props;
  //   if (sections) {
  //     return Object.keys(sections).map((key) => {
  //       if (key === 'error') {
  //         this.setState({ error: sections[key]})
  //       } else {
  //         return <CatalogSection section={sections[key]} key={key} />
  //       }
  //
  //     });
  //   }
  // }
  //   let plantSections = {};
  //   firebase.database().ref('db').once('value', (snapshot) => {
  //     let plants = snapshot.val();
  //     let plantSectionKeys = this.getObjectKeys(plants, 'PRODUCT GROUP');
  //     plantSectionKeys.forEach((key) => {
  //       plantSections[key] = {};
  //     });
  //     this.setState({
  //       productGroupKeys: plantSectionKeys,
  //       plantSections: plantSections
  //     });
  //     let query = firebase.database().ref('db').orderByChild('PRODUCT GROUP');
  //     Object.keys(plantSections).map((key) => {
  //       query.startAt(key).endAt(key).once('value', (childSnap) => {
  //         plantSections[key] = childSnap.val();
  //       });
  //     });
  //     this.setState({ plantSections: plantSections });
  //     // console.log('first sections:', plantSections);
  //
  //     // for now let's just do one ----
  //     // query.startAt('HERBS').endAt('HERBS').once('value', (genusSnap) => {
  //     //   let section = genusSnap.val();
  //     //   renderArray.push(this.renderPlantSection(section, 'HERBS'));
  //     //   this.setState({ renderArray: renderArray });
  //     //   plantSections['HERBS'] = genusSnap.val();
  //     // });
  //
  //
  //     // uncomment below to restore multiple sections
  //     Object.keys(plantSections).map((key, i) => {
  //       let promise = query.startAt(key).endAt(key).on('value', (genusSnap) => {
  //         let {plantSections, renderArray = []} = this.state;
  //         let section = genusSnap.val();
  //         console.log('u got section', section, renderArray)
  //         plantSections[key] = genusSnap.val();
  //         this.setState({ plantSections: plantSections });
          // return(<CatalogSection key={key} section={section} title={key} />);
  //       });
  //       promise.catch((error) => {
  //         this.setState({error: error});
  //       });
  //       this.setState({ renderArray: renderArray });
  //
  //
  //     });
  //   });
  // }

// CatalogSection.propTypes = {
//   selectedSection: PropTypes.string.isRequired,
//   plants: PropTypes.array.isRequired,
//   isFetching: PropTypes.bool.isRequired,
//   dispatch: PropTypes.func.isRequired
// }
// function mapStateToProps({ currentUser }) {
//   return { currentUser };
// }

  // const { selectedSection, plantsBySection, currentUser } = state;
  // const {
  //   isFetching,
  //   items: plants
  // } = plantsBySection[selectedSection] || {
  //   isFetching: true,
  //   plants: []
  // }


    // if (plants) {
    // let renderArray = [];
    // if (plants.hasOwnProperty('didInvalidate')) {
    //   if (plants.didInvalidate) {
    //     return (<div key='loading'><span>errors! </span></div>)
    //   }
    //   if (plants.isFetching) {
    //     // it's loading
    //     console.log('its fetchin');
    //     return (<div key='loading'><span>Loading...</span></div>);
    // }
    //   if (!plants.didInvalidate && !isFetching && plants.hasOwnProperty('plants')) {
    //     let thesePlants = plants.plants.plants;
    //     console.log('plantsplants', thesePlants)
        //renderArray = this.renderSections(thesePlants);
  //   } else {
  //     return (<div>getting going</div>)
  //   }
  // } else {
  //   return (<div>getting going</div>)
    // }
  // }

  // getObjectKeys(plants, key) {
  //   let sectionArray = [];
  //   let currentKey = '';
  //   plants.forEach((plant) => {
  //     if (plant[key] !== currentKey) {
  //       currentKey = plant[key];
  //       let isInGroup = sectionArray.indexOf(currentKey);
  //       if (isInGroup === -1) {
  //         sectionArray.push(currentKey);
  //
  //       }
  //       if (isInGroup > -1 ) {
  //
  //       }
  //     }
  //   });
  //   return sectionArray;
  // }

  // isInGroup(plants, sectionKey, plantSections = {}) {
  //   let sectionArray = [];
  //   let currentKey = '';
  //   Object.keys(plants).map((key) => {
  //     if (plants[sectionKey] !== currentKey) {
  //       currentKey = plant[sectionKey];
  //       let isInGroup = sectionArray.indexOf(currentKey);
  //       if (isInGroup === -1) {
  //         sectionArray.push(currentKey);
  //         plantSections[currentKey] = [plant];
  //       }
  //       if (isInGroup > -1 ) {
  //         let currentPlants = plantSections[currentKey];
  //         if (currentPlants.length > 1) {
  //         }
  //         currentPlants.push(plant);
  //         plantSections[currentKey] = currentPlants;
  //       }
  //     }
  //
  //   });
  //   return plantSections;
  // }
