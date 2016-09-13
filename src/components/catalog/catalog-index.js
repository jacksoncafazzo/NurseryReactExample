import React, { Component, PropTypes } from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import CatalogSection from './catalog-section';
import CatalogSearch from './catalog-search';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { selectSection, fetchPlantsIfNeeded, invalidatePlants, fetchPlantsBySection } from '../actions/firebase_actions';

import firebase from 'firebase';

import './styles/catalog-index.css';

const ref = firebase.database().ref('catalog');

class CatalogIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      renderArray: [],
      sectionNames: [],
      searchRequest: '',
      sections: {}
    }
  }

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

  componentWillMount() {
    let {searchRequest} = this.state;
    this.getPlantsBySection(searchRequest)
  }

  getPlantsBySection(searchRequest) {
    let self = this;
    if (searchRequest.length > 0) {
      query = ref.orderByChild('Genus')
        .startAt(searchRequest)
        .endAt(searchRequest)
    }
    if (searchRequest === '') {
      ref.orderByChild('PRODUCT GROUP')
        .once('value')
        .then((snapshot) => {
          let plants = snapshot.val();
          let sections = this.state.sections;
          let sectionNames = [];
          let scientificNames = [];
          let genusNames = [];
          let varietyNames = [];
          Object.keys(plants).map((key) => {
            let plantSection = plants[key]['PRODUCT GROUP'];
            let plantGenus = plants[key]['Genus'].trim();
            let plantVariety = plants[key]['Variety 2'];
            let plantGenusVariety = plants[key]['Variety'];
            let isInSection = Object.keys(sections).includes(plantSection);
            if (!isInSection) {
              sections[plantSection] = {}
              sectionNames.push(plantSection);

              if (plantVariety === '' && plantGenusVariety !== '') {
                genusNames.push(plantGenusVariety);
                sections[plantSection][plantGenus] = {
                  Description: plants[key]['Description'],
                  [plantGenusVariety]: [plants[key]]
                };
              }
              if (plantVariety !== '') {
                genusNames.push(plantGenus);
                sections[plantSection][plantGenus] = {
                  [plantVariety]: [plants[key]]
                };
                varietyNames.push(plantVariety);
              }
              // sections[plantSection][plantGenus] = {
              //   Description: plants[key]['Description'],
              //   [plantVariety]: [plants[key]]
              // };
            }

            if (isInSection) {
              let isInGenus = false;
              let isInVariety = false;
              Object.keys(sections[plantSection]).map((key) => {
                if (key === plantGenus) {
                  isInGenus = true;
                }
                if (sections[plantSection][key][plantVariety] === plantVariety) {
                  isInVariety = true;
                }
              });

              if (!isInGenus) {
                genusNames.push(plantGenus);
                if (!isInVariety && plantVariety === '' && plantGenusVariety !== '') {
                  varietyNames.push(plantGenusVariety);
                  sections[plantSection][plantGenus] = {
                    Description: plants[key]['Description'],
                    [plantGenusVariety]: [plants[key]]
                  };
                }
                if (!isInVariety && plantVariety !== '') {
                  varietyNames.push(plantVariety);
                  sections[plantSection][plantGenus] = {
                    Description: plants[key]['Description'],
                    [plantVariety]: [plants[key]]
                  }
                }
              }
              // self.setState({ sections: sections });
              if (isInGenus) {
                // console.log('Variety', plantVariety);
                // console.log('genusVariety', plantGenusVariety, plants[key]);
                if (!isInVariety && plantVariety === '' && plantGenusVariety !== '') {
                  varietyNames.push(plantVariety);
                  sections[plantSection][plantGenus]['Description'] = plants[key]['Description'];
                  sections[plantSection][plantGenus][plantGenusVariety] = [plants[key]];
                }
                if (!isInVariety && plantVariety !== '') {
                  varietyNames.push(plantVariety);
                  sections[plantSection][plantGenus]['Description'] = plants[key]['Description'];
                  sections[plantSection][plantGenus][plantVariety] = [plants[key]];
                  // console.log('is in section, genus, not variety', sections)
                }
                if (isInVariety && plantVariety === '' && plantGenusVariety !== '') {
                  sections[plantSection][plantGenus][plantGenuplantGenusVariety].push(plants[key]);
                }
                if (isInVariety && plantVariety !== '') {
                  sections[plantSection][plantGenus][plantVariety].push(plants[key]);
                }
              }
            }
          });
          console.log('sectionName', sectionNames, genusNames, varietyNames, sections)
          self.setState({ sections: sections, genusNames: genusNames });

        });
      }
    }
  componentDidMount() {
    // const { dispatch, selectedSection } = this.props;
    // dispatch(fetchPlantsIfNeeded(selectedSection))
  }

  componentWillReceiveProps() {
    console.log('did receive props', this.props.children);

  }

  componentWillUnmount() {
    let { sectionNames } = this.state;
    sectionNames.forEach((sectionName) => {
      firebase.database().ref(`catalog/${sectionName}`).off();
    })
  }

  handleSearchRequest({searchRequest}) {
    let { sectionNames, sections } = this.state;
    let sectionSearchNames = [];
    let varietySearchNames = [];
    let searchSections = {};
    console.log('searchRequest2', searchRequest);
    Object.keys(sections).map((sectionKey) => {
      Object.keys(sections[sectionKey]).map((genusKey) => {
        let plant = sections[sectionKey][genusKey];
        let plantSection = plant['PRODUCT GROUP'];
        if (searchRequest === plant['Genus'] && plantSection === sectionKey) {
          let isInSection = sectionSearchNames.indexOf(plantSection);
          if (isInSection < 0) {
            sectionSearchNames.push(plantSection);
            searchSections[plantSection][plant['Genus']] = {};
          }
          if (isInSection > -1) {

            // searchSections[plantSection][plant['Genus']].push(plant);
            if (plant['Variety 2'] === null) {
              searchSections[plantSection][plant['Genus']]['Description'] = plant['Description'];
            } else {
              let isInVariety = varietySearchNames.indexOf(plant['Variety 2']);
              if (isInVariety < 0) {
                searchSections[plantSection][searchRequest][plant['Variety 2']] = [plant];
              }
              if (isInVariety > -1) {
                searchSections[plantSection][searchRequest][plant['Variety 2']].push(plant);
              }
            }
          } else {
            console.log('plant doesnt match search');
          }
        } else {
          console.log('boop');
        }

        this.setState({ sections: searchSections})
      });
    });

  }
    // sectionNames.forEach((sectionName) => {
    //   firebase.database().ref('catalog')
    //   .orderByChild('PRODUCT GROUP')
    //   .startAt(sectionName)
    //   .endAt(sectionName)
    //   .on('value', (snapshot) => {
    //     //let { sections } = this.state;
    //     console.log('live snap', sectionName, snapshot.val())
    //     let {searchSectionKeys} = this.state;
    //     if (snapshot.val() !== null) {
    //       let sections = {};
    //       Object.keys(snapshot.val()).map((key, i) => {
    //         let searchSectionName = snapshot.val()[key]['Name'];
    //         if (searchSectionName && searchSectionKeys.indexOf(searchSectionName) < 0) {
    //           searchSectionKeys.push(searchSectionName);
    //           // sections[searchSectionName] = [snapshot.val()[key]];
    //         }
    //         if (searchSectionKeys.indexOf(searchSectionName) > -1) {
    //           console.log('is in section')
    //           // sections[searchSectionName].push(snapshot.val()[key]);
    //         }
    //       });
    //       this.setState({
    //         sections: {
    //           [searchSectionKeys[0]]: snapshot.val()
    //         }
    //       });
    //     console.log('this.state.sections', this.state.sections)
    //   } else {
    //     console.log('null snap', sectionName);
    //
    //   }

  //     });
  //   });
  // }

  render() {
    // const { dispatch, selectedSection, plants, isFetching } = this.props;
    let { sections, genusNames } = this.state;
    console.log('sections', sections)
    let renderArray = [];
    // if (sections !== undefined) {
    //   renderArray = Object.keys(sections).map((key) => {
    //     return <CatalogSection {...this.props} section={sections[key]} key={key} title={key} /> })
    //     }
    // {(renderArray.length > 0 ) ? renderArray : <div>plants loading</div>}
        return (
          <div className='peoria-index'>
            {(genusNames) ? <CatalogSearch {...this.props} genusNames={genusNames} handleSearchRequest={this.handleSearchRequest.bind(this)} /> : null}
            <p>{this.state.searchRequest}</p>
            <Card className='index-card'>
              <CardHeader
                title='Current Catalog' />
              {(sections) ? Object.keys(sections).map((key, i) => {
                return <CatalogSection section={sections[key]} title={key} key={i} />
              }) : null}
          </Card>
        </div>
      );
    }
  }

  export default CatalogIndex;
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
