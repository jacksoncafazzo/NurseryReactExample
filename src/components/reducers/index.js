import { combineReducers } from 'redux';
import FirebaseReducer from './firebase-reducer';
import TabReducer from './reducer-tab';

const rootReducer = combineReducers({
  currentUser: FirebaseReducer,
  slideIndex: TabReducer,
});

export default rootReducer;
