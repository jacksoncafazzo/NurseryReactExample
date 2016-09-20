import { combineReducers } from 'redux';
import FirebaseReducer from './firebase-reducer';
import TabReducer from './reducer-tab';
import PlantsReducer from './reducer-genuses';

const rootReducer = combineReducers({
  currentUser: FirebaseReducer,
  slideIndex: TabReducer,
  plants: PlantsReducer,
});

export default rootReducer;
