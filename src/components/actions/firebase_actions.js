import FireBaseTools from '../utils/firebase';

import {
  LOGIN_WITH_PROVIDER_FIREBASE,
  REGISTER_FIREBASE_USER,
  LOGIN_FIREBASE_USER,
  FETCH_FIREBASE_USER,
  UPDATE_FIREBASE_USER,
  CHANGE_FIREBASE_USER_PASSWORD,
  FIREBASE_PASSWORD_RESET_EMAIL,
  LOGOUT_FIREBASE_USER,
  SELECT_SECTION,
  INVALIDATE_SECTION,
  REQUEST_PLANTS,
  RECEIVE_PLANTS
} from './types';

export function selectSection(sectionName) {
  return {
    type: SELECT_SECTION,
    sectionName
  }
}

export function invalidateSection(sectionName, error) {
  return {
    type: INVALIDATE_SECTION,
    sectionName,
    error
  }
}

export function requestPlants(sectionName) {
  const promise = FireBaseTools.fetchPlantsBySection(sectionName);
  return {
    type: REQUEST_PLANTS,
    sectionName,
    promise
  }
}

function receivePlants(sectionName, plants) {
  console.log('u got plants', plants.val())
  return {
    type: RECEIVE_PLANTS,
    sectionName,
    items: plants.val(),
    receivedAt: Date.now()
  }
}

function fetchPlants(sectionName) {

  return dispatch => {
    dispatch(requestPlants(sectionName))
    return plants => dispatch(receivePlants(sectionName, plants ));
  }
}

function shouldFetchPlants(state, sectionName) {
  const plants = state.plantsBySection[sectionName]
  if (!plants) {
    return true
  } else if (plants.isFetching) {
    return false
  } else {
    return plants.didInvalidate
  }
}

export function fetchPlantsIfNeeded(sectionName) {
  return (dispatch, getState) => {
    if (shouldFetchPlants(getState(), sectionName)) {
      return dispatch(fetchPlants(sectionName))
    }
  }
}

export function loginWithProvider(provider){
  const request = FireBaseTools.loginWithProvider(provider);
  return {
    type : LOGIN_WITH_PROVIDER_FIREBASE,
    payload : request
  }
}

///// EXPORTED ACTIONS
export function registerUser(user) {

    const request = FireBaseTools.registerUser(user);
    return {
        type: REGISTER_FIREBASE_USER,
        payload: request
    }
}

export function loginUser(user) {
    const request = FireBaseTools.loginUser(user);
    return {
        type: LOGIN_FIREBASE_USER,
        payload: request
    }
}

// fetch already authentciated user
export function fetchUser() {

    const request = FireBaseTools.fetchUser();
    return {
        type: FETCH_FIREBASE_USER,
        payload: request
    };
};

export function updateUser(user) {
    const request = FireBaseTools.updateUser(user);
    return {
        type: UPDATE_FIREBASE_USER,
        payload: request
    }
}

export function changePassword(newPassword) {
    const request = FireBaseTools.changePassword(newPassword);
    return {
        type: CHANGE_FIREBASE_USER_PASSWORD,
        payload: request
    }
}

export function resetPasswordEmail(email){
  const request = FireBaseTools.resetPasswordEmail(email);
  return {
    type : FIREBASE_PASSWORD_RESET_EMAIL,
    payload : request
  }
}

export function logoutUser(user) {
    const request = FireBaseTools.logoutUser(user);
    return {
        type: LOGOUT_FIREBASE_USER,
        payload: request
    }

}
