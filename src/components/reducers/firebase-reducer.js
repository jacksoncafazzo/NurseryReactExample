import {
  LOGIN_WITH_PROVIDER_FIREBASE,
  REGISTER_FIREBASE_USER,
  LOGIN_FIREBASE_USER,
  FETCH_FIREBASE_USER,
  UPDATE_FIREBASE_USER,
  CHANGE_FIREBASE_USER_PASSWORD,
  FIREBASE_PASSWORD_RESET_EMAIL,
  LOGOUT_FIREBASE_USER
} from '../actions/types';


export default function(state = {}, action) {
    switch (action.type) {
        case FETCH_FIREBASE_USER:
            return { currentUser: action.payload }
        case LOGOUT_FIREBASE_USER:
            return { currentUser: action.payload }
        case REGISTER_FIREBASE_USER:
              return { currentUser: action.payload }
        case LOGIN_FIREBASE_USER:
              return { currentUser: action.payload }
        case UPDATE_FIREBASE_USER:
              return { currentUser: action.payload };
        case CHANGE_FIREBASE_USER_PASSWORD:
              return { currentUser: action.payload };
        case FIREBASE_PASSWORD_RESET_EMAIL:
              return { currentUser: action.payload };
        case LOGIN_WITH_PROVIDER_FIREBASE:
              return { currentUser: action.payload };
        default: return state;
    }

}
