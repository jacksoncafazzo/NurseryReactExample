import firebase from 'firebase';
import { FIREBASE_CONFIG } from '../../../config';

import {
  currentUserPromise,
  fetchUserObject
} from './local-storage';

// You can remove it
if (FIREBASE_CONFIG.apiKey.length < 1) {
    alert('Please fill your Firebase settings to config.js');
}

export const firebaseApp = firebase.initializeApp(FIREBASE_CONFIG);
export const firebaseAuth = firebaseApp.auth();
export const firebaseDb = firebaseApp.database();

// FIREBASE TOOL OBJECT LITERAL
const FireBaseTools = {
  getProvider: (provider) => {
    switch (provider) {
      case 'facebook':
      return new firebase.auth.FacebookAuthProvider();
      case 'google':
      return new firebase.auth.GoogleAuthProvider();
      default:

    }
    },
    // Login with provider => p is provider 'facebook' or 'google'
    loginWithProvider: (p) => {

        var provider = FireBaseTools.getProvider(p);
        return firebaseAuth.signInWithPopup(provider).then(function(result) {

            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const token = result.credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // save user to localstorage
            return fetchUserObject(user).then(user => {
                return user;
            })


        }).catch(function(error) {

            // The email of the user's account used.
            const email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            const credential = error.credential;

            return {
                errorCode: error.code,
                errorMessage: error.message
            }

        });

    },

    registerUser: (user) => {
      return firebaseAuth.createUserWithEmailAndPassword(user.email, user.password).then(user => {

        return fetchUserObject(user).then(user => {
          return user;
        })

      }).catch(error => {

        return {
          errorCode: error.code,
          errorMessage: error.message
        }

      });

    },

    logoutUser: (user) => {

        return firebaseAuth.signOut().then(function() {
            // Sign-out successful and clear data.
            localStorage.clear();
            return {
                success: 1,
                message: 'logout'
            };
        });
    },

    fetchUser: () => {
      console.log('getting user')
        return new Promise((resolve, reject) => {
            currentUserPromise().then(user => {
                if (user) {
                    resolve(user)
                };
            });

            firebaseAuth.onAuthStateChanged(user => {
                //resolve(firebase.auth().currentUser);
                if (user) {
                    fetchUserObject(firebase.auth().currentUser).then(user => {
                        resolve(user);
                    })
                } else {
                    resolve(null)
                }
            });
        });

    },

    loginUser: (user) => {

        return firebaseAuth.signInWithEmailAndPassword(user.email, user.password).then(user => {
            // save user to localstorage
            return fetchUserObject(user).then(user => {
                return user;
            })

        }).catch(error => {
            return {
                errorCode: error.code,
                errorMessage: error.message
            }

        });
    },

    updateUser: (u) => {

        if (firebaseAuth.currentUser) {
            var user = firebaseAuth.currentUser;
            return user.updateProfile({
                displayName: u.displayName,
                photoUrl: '' // field for photo url
            }).then(data => {

                // renew user
                return fetchUserObject(firebase.auth().currentUser).then(user => {
                    return user;
                })

            }, error => {
                return {
                    errorCode: error.code,
                    errorMessage: error.message
                }
            })
        } else {
            return null;
        }


    },

    resetPasswordEmail: (email) => {

        return firebaseAuth.sendPasswordResetEmail(email).then((data) => {
            return {
                message: 'Email sent',
                errorCode: null
            }
        }, error => {
            // An error happened.
            return {
                errorCode: error.code,
                errorMessage: error.message
            }
        });

    },

    changePassword: (newPassword) => {

        return firebaseAuth.currentUser.updatePassword(newPassword).then((user) => {
            return fetchUserObject(user).then(user => {
                return user;
            })

        }, error => {

            return {
                errorCode: error.code,
                errorMessage: error.message
            }
        });

    },
    fetchPlantsBySection: (sectionName) => {
      return firebase.database().ref('db').orderByValue().startAt(sectionName).endAt(sectionName).once('value', (snapshot) => {
        return { [sectionName]: snapshot.val() };
      });
    }
};

// export FirebaseTolls
export default FireBaseTools;
