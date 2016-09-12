import firebase from 'firebase';

export const GET_SECTIONS = 'GET_SECTIONS';

export function getAllSectionsWithNames() {
  let plantSections = {};
  firebase.database().ref('db').once('value', (snapshot) => {
    let plants = snapshot.val();
    let plantSectionKeys = this.getObjectKeys(plants, 'PRODUCT GROUP');
    plantSectionKeys.forEach((key) => {
      plantSections[key] = {};
    });
    return {
      type: GET_SECTIONS,
      payload: plantSections
    }
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
