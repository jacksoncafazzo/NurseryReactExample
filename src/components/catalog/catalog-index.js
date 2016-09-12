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
    ref.orderByChild('PRODUCT GROUP')
      .once('value')
      .then((snapshot) => {
        let plants = snapshot.val();
        let sections = {};
        let sectionNames = [];
        let scientificNames = [];
        let genusNames = [];
        let varietyNames = [];
        Object.keys(plants).map((key) => {
          let plantSection = plants[key]['PRODUCT GROUP'];
          let plantGenus = plants[key]['Genus'];
          let plantVariety = plants[key]['Variety 2'];
          let isInSection = sectionNames.indexOf(plantSection);
          if (isInSection < 0) {
            sectionNames.push(plantSection);
          }
          genusNames.push(plantGenus.trim());
          varietyNames.push(plantVariety);
          if (!sections.hasOwnProperty(plantSection)) {
            sections[plantSection] = {};
          }
          if (!sections[plantSection].hasOwnProperty(plantGenus)) {
            sections[plantSection][plantGenus] = {};
          }
          if (plantVariety === '') {
            sections[plantSection][plantGenus]['Description'] = plants[key]['Description'];
          } else {
            if (!sections[plantSection][plantGenus].hasOwnProperty(plantVariety)) {
              sections[plantSection][plantGenus][plantVariety] = [plants[key]]
            } else {
              sections[plantSection][plantGenus][plantVariety].push(plants[key])
            }
          }


          if (isInSection > -1) {
            let isInGenus = genusNames.indexOf(plantGenus);
            let isInVariety = varietyNames.indexOf(plantVariety);
            if (isInGenus < 0) {
              genusNames.push(plantGenus.trim());
              sections[sectionNames[isInSection]][plantGenus] = {};
              if (isInVariety < 0) {
                varietyNames.push(plantVariety);
                sections[sectionNames[isInSection]][plantGenus][plantVariety] = [plants[key]];
                // sections[plantSection][plantGenus][plantVariety] = [plants[key]];
              }
            }
            if (isInGenus > -1 && plantVariety === '') {
              sections[sectionNames[isInSection]][genusNames[isInGenus]]['Description'] = plants[key]['Description'];
            }
            if (isInGenus > -1 && plantVariety !== '' && isInVariety > -1) {
              // console.log('plant', plants[key])
              // console.log('genusName, varietyName', genusNames[isInGenus], varietyNames[isInVariety])
              // sections[sectionNames[isInSection]][genusNames[isInGenus]][varietyNames[isInVariety]].push(plants[key]);

            }
          }

              //
              // sections[sectionNames[isInSection]][plantGenus][plantVariety].push(plants[key])

              // if (isInVariety > -1) {
              //   console.log('totes', sections[sectionNames[isInSection]][plantGenus]);
              //   // .push(plants[key])
              // }
              // sections[sectionNames[isInSection]][genusNames[isInGenus]] = {};
            // }
            // if (isInGenus > -1) {
            //   sections[plantSection][plantGenus].push(plants[key]);
            //
            // }



          // if (scientificNames.indexOf(plants[key]['Genus']) < 0) {
          //   scientificNames.push(plants[key]['Genus']);
          //   sections[plants[key]['PRODUCT GROUP'][plants[key]['Genus']]] = [plants[key]];
          // } else {
          //   sections[plants[key]['PRODUCT GROUP'][plants[key]['Genus']]]
          // }
          //
          // if (scientificNames.indexOf(plant['Genus 2']) < 0) {
          //   scientificNames.push(plant['Genus 2']);
          // }
          // if (scientificNames.indexOf(plant['Variety']) < 0) {
          //   scientificNames.push(plant['Variety']);
          // }
          // this.setState({ sections: sections,  sectionNames: sectionNames, scientificNames: scientificNames });
        });

          console.log('sectionName', sectionNames, genusNames, varietyNames, sections)
          this.setState({ sections: sections })



      });
    }

          // return (<CatalogSection key={key} title={key} section={sections[key]} />);

        // let searchRenderArray = [<CatalogSearch scientificNames={scientificNames} key='catalog-search' />];

// renderArray: searchRenderArray.concat(sectionRenderArray),
//   console.log('genusNames', genusNames)
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
    let { sectionNames } = this.state;
    sectionNames.forEach((sectionName) => {
      firebase.database().ref(`catalog/${sectionName}`)
      .orderByChild('Genus')
      .startAt(searchRequest)
      .endAt(searchRequest)
      .on('value', (snapshot) => {
        //let { sections } = this.state;
        if (snapshot.val() !== null) {
          let searchSectionKeys = [];
          console.log(snapshot.val());
        let sections = {};
        Object.keys(snapshot.val()).map((key, i) => {
          let searchSectionName = snapshot.val()[key]['Name'];
          if (searchSectionName && searchSectionKeys.indexOf(searchSectionName) < 0) {
            searchSectionKeys.push(searchSectionName);
            // sections[searchSectionName] = [snapshot.val()[key]];
          }
          if (searchSectionKeys.indexOf(searchSectionName) > -1) {
            console.log('is in section')
            // sections[searchSectionName].push(snapshot.val()[key]);
          }
        });
        this.setState({
          sections: {
            [searchSectionKeys[0]]: snapshot.val()
          }
        });
        console.log('this.state.sections', this.state.sections)
      }

      });
    });
  }

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
