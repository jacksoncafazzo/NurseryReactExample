import React, { Component, PropTypes } from 'react';
import { Card, CardHeader, CardText, CardTitle } from 'material-ui/Card';
import { Tabs, Tab } from 'material-ui/Tabs';
import { List, ListItem } from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';
import Radium from 'radium';

import Star from 'material-ui/svg-icons/action/stars'

import CatalogSection from './catalog-section';
import CatalogSearch from './catalog-search';

import firebase from 'firebase';
import {colors} from 'material-ui/styles';

import '../../styles/catalog-index.css';

const ref = firebase.database().ref('catalog');

const listStyles = {
  fontSize: '1.5em',
  fontWeight: 'bold'
}

class CatalogIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      renderArray: [],
      menuRender: null,
      sectionNames: null,
      searchRequest: 'PREMIUMS',
      searchRequests: [],
      plants: {},
      catalogKeys: {
        sectionNames: [],
        genusNames: [],
        scientificNames: []
      }
    }
  }

  componentWillMount() {
    //See if there is a search request
    let {searchRequest} = this.state;
    firebase.database().ref().child('catalogKeys').on('value', (snapshot) => {
      if (snapshot === null) {

        // Get all the plants and create a list of sectionNames and scientificNames
        ref.orderByChild('PRODUCT GROUP')
        .on('value', (snapshot) => {
          let plants = snapshot.val();
          console.log('init snap', plants);
          //firebase snapshot callback
          let sectionNames = [];
          let scientificNames = [];
          let genusNames = [];
          plants.forEach((plant) => {
            if (!sectionNames.includes(plant['PRODUCT GROUP'])) {
              sectionNames.push(plant['PRODUCT GROUP']);
            };
            if (!genusNames.includes(plant['Genus'].trim())) {
              genusNames.push(plant['Genus'].trim());
              if (!scientificNames.includes(plant['Variety'])) {
                scientificNames.push(`${plant['Genus 2'].trim()} ${plant['Variety']}`);
              }
            }
          });
          // looping through plants ends

          // create menu-tabs
          let menuRender = this.renderListItems(sectionNames);

          // snapshot callback ending, set the states
          let catalogKeys = {
            sectionNames: sectionNames,
            genusNames: genusNames,
            scientificNames: scientificNames
          }
          this.setState({catalogKeys, menuRender});

          //save the lists to database
          firebase.database().ref().child('catalogKeys').set(catalogKeys);
        });
      //snapshot not null?
    } else {
      let catalogKeys = snapshot.val();
      console.log('ths snap', snapshot.val())
      let menuRender = this.renderListItems(catalogKeys.sectionNames);
      this.setState({catalogKeys: catalogKeys, menuRender: menuRender});
    }
    });
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

  getPlantsBySection(searchRequest) {
    let {plants, searchRequests} = this.state;
    if (!searchRequests.includes(searchRequest)) {
      plants[searchRequest] = {};
      searchRequests.push(searchRequest)
    } else {
      console.log('u already searched for that');
      return
    }
    ref.orderByChild('PRODUCT GROUP')
      .equalTo(searchRequest)
      .on('value', (snapshot) => {
        let newPlants = snapshot.val();
        if (!newPlants) {
          console.log('database doesnt have that product group');
          return
        }
        plants[searchRequest] = newPlants;
        this.setState({ plants: plants });
        console.log('plants', plants);
    });
    this.setState({ searchRequests: searchRequests });
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

  handleSectionSelect(sectionName) {
    this.getPlantsBySection(sectionName);
    this.setState({ searchRequest: sectionName });
  }

  renderListItems(sectionNames) {
    let styles = {
      listItem: {
      background: [
      `linear-gradient(${colors.lightGreen500}, ${colors.green500})`,

      // fallback
      colors.lightGreen500,
    ],
      color: 'white',
      marginLeft: 20
      }
    };
    let renderArray = [];
    sectionNames.forEach((sectionName, i) => {
      renderArray.push(
        <ListItem primaryText={sectionName} key={sectionName} style={styles.listItem} onTouchTap={this.handleSectionSelect.bind(this, sectionName)} />
      );
    });
    return renderArray
  }

  render() {
    // const { dispatch, selectedSection, plants, isFetching } = this.props;
    let { plants, catalogKeys } = this.state;
    let { sectionNames, genusNames, scientificNames } = catalogKeys;
    let styles = {
      menuCard: {
        width: 300,

      },
      tabs: {
        inkBarStyle: {
          backgroundColor: colors.yellow500
        }
      },
      listItem: {
      backgroundColor: colors.green500,
      width: 280,
      textAlign: 'left',
      fontWeight: 'bold'
      }
    };
    return (
      <div className='catalog-index'>
        <div className='sidebar'>
          {(sectionNames) ?
            <List>{this.renderListItems(sectionNames)}
            </List> : <div><List><ListItem primaryText='LOADING SECTIONS'  /></List><CircularProgress size={2} color={colors.red900} /></div>}
        </div>
        <Card className='index-card'>
          {(plants) ? Object.keys(plants).map((key, i) => {
            return <CatalogSection plant={plants[key]} title={key} key={i} />
          }) : null}
          <div className='search'>
            {(scientificNames) ? <CatalogSearch {...this.props} scientificNames={scientificNames}
            genusNames={genusNames}
            sectionNames={sectionNames}
            catalogKeys={catalogKeys} handleSearchRequest={this.handleSearchRequest.bind(this)} /> : null}
          </div>
      </Card>
      </div>
    );
  }
}

export default Radium(CatalogIndex);



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
