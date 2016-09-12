import firebase from 'firebase';
import { firebaseDb } from './firebase';

const FirebaseCatalogTools = {
  selectSection: (searchTerm) => {
    return firebaseDb.ref('db').orderByChild('PRODUCT GROUP')
    .startAt(searchTerm)
    .endAt(searchTerm)
    .once('value').then((snapshot) => {
      snapshot = snapshot.val()
      return { searchTerm, snapshot };
    }).catch((error) => {
      return {
        error: error
      };
    });
  },
  getAllSectionsWithNames: () => {
    return firebase.database().ref('db').once('value').then((snapshot) => {
      let plants = snapshot.val();
      console.log('in ure action', plants)
      // let sectionKeys = [];
      //
      // let plantSections = {};
      // sectionKeys.forEach((key) => {
      //   plantSections[key] = [];
      // });
      // plants.map((plant) => {
      //   let groupName = plant['PRODUCT GROUP'];
      //   plantSections[groupName].push(plant);
      // });
      return { plants };
    });
  },
  plantsBySection: (sectionName) => {
    return firebase.database().ref('db').orderByValue().startAt(sectionName).endAt(sectionName).once('value', (snapshot) => {
      return { [sectionName]: snapshot };
    });
  }
}

export default FirebaseCatalogTools;
