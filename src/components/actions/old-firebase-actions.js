import firebase from 'firebase';
import { GET_SECTION, GET_SECTIONS, GET_SECTIONS_REQUEST, GET_SECTION_REQUEST, GET_SECTIONS_SUCCESS, GET_SECTIONS_FAILURE } from './types';
import FirebaseTools from '../utils/firebase';

export function getAllSections() {
  const request = FirebaseTools.getAllSectionsWithNames();
  return {
    type: GET_SECTIONS,
    payload: request
  }
}


export function getAllSectionsWithNames(dispatch) {
  firebase.database().ref('db').once('value').then((snapshot) => {
    let plants = snapshot.val();
    let plantSectionKeys = [];

    let plantSections = {};
    plantSectionKeys.forEach((key) => {
      plantSections[key] = {};
    });
    return dispatch(getSectionsSuccess(plantSections));
  }).catch((error) => {
    return dispatch(getSectionsFailure(error));
  });
}

export function getSectionsSuccess(sections) {
  return {
    type: GET_SECTIONS_SUCCESS,
    sections: sections
  }
}

export function getSectionsFailure(sections, error) {
  return {
    type: GET_SECTIONS_FAILURE,
    sections: sections,
    error: error
  }
}

export function waiting() {
  console.log('IN WAIT');
  return {
    type: 'waiting'
  }
}

export function getSectionRequest(searchTerm) {
  return function (dispatch, getState) {
    let { sections } = getState();
    if (sections.contains(searchTerm) > -1) {
      // you already got it
      return
    }

    dispatch({
      type: GET_SECTION_REQUEST,
      searchTerm: searchTerm
    });
  }
}


export function selectSection(dispatch, searchTerm) {
  firebase.database().ref('db').orderByChild('PRODUCT GROUP')
    .startAt(searchTerm)
    .endAt(searchTerm)
    .once('value').then((snapshot) => {
      return dispatch(getSectionsSuccess(snapshot.val()));
    }).catch((error) => {
      return dispatch(getSectionsFailure(error));
    });
  }

    // this.setState({
    //   productGroupKeys: plantSectionKeys,
    //   plantSections: plantSections
    // });
    // let query = firebase.database().ref('db').orderByChild('PRODUCT GROUP');
    // Object.keys(plantSections).map((key) => {
    //   query.startAt(key).endAt(key).once('value', (childSnap) => {
    //     plantSections[key] = childSnap.val();
    //   });
    // });
    // this.setState({ plantSections: plantSections });
    // console.log('first sections:', plantSections);
    //
    // for now let's just do one ----
    // query.startAt('HERBS').endAt('HERBS').once('value', (genusSnap) => {
    //   let section = genusSnap.val();
    //   renderArray.push(this.renderPlantSection(section, 'HERBS'));
    //   this.setState({ renderArray: renderArray });
    //   plantSections['HERBS'] = genusSnap.val();
    // });


    // uncomment below to restore multiple sections
//     Object.keys(plantSections).map((key, i) => {
//       let promise = query.startAt(key).endAt(key).once('value', (genusSnap) => {
//         let {plantSections, renderArray = []} = this.state;
//         let section = genusSnap.val();
//         console.log('u got section', section, renderArray)
//         plantSections[key] = genusSnap.val();
//         this.setState({ plantSections: plantSections });
//         return(<CatalogSection key={key} section={section} title={key} />);
//       });
//       promise.catch((error) => {
//         this.setState({error: error});
//       });
//       this.setState({ renderArray: renderArray });
//
//
//     });
// }
