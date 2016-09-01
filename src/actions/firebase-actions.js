import firebase from 'firebase';

export function createUser(user) {
  console.log('user: ', user);
  firebase.database().ref(`users/${user.uid}`).set(user);
}

export function getUser(uid) {

}

export function saveUserFlower(resultObject, flower) {
  const user = firebase.auth().currentUser;
  resultObject.userId = user.uid;
  resultObject.userEmail = user.email;
  resultObject.commonName =  flower.commonName;
  resultObject.img = flower.img;
  resultObject.flowerKey = flower.key;
  const ref = firebase.database().ref(`users/${user.uid}`);
  ref.push(resultObject)
  .then((result, errors) => {
    console.log(errors);
  });
}

export function removeUserFlower(key) {
  const user = firebase.auth().currentUser;
  firebase.database().ref(`users/${user.uid}/${key}`).remove();
  console.log('deleted');
}
