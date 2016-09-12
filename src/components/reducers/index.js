import { combineReducers } from 'redux';
import FirebaseReducer from './firebase-reducer';
import { selectedSection, plantsBySection } from './reducer-section';

const rootReducer = combineReducers({
  currentUser: FirebaseReducer,
  plantsBySection,
  selectedSection,
});

export default rootReducer;
