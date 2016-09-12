import { SELECT_SECTION, INVALIDATE_SECTION,
  REQUEST_PLANTS, RECEIVE_PLANTS } from '../actions/types';

export function selectedSection(state = 'HERBS', action) {
  switch (action.type) {
  case SELECT_SECTION:
    return action.sectionName
  default:
    return state
  }
}

const plants = (state = {
  isFetching: false,
  didInvalidate: false,
  plants: {}
}, action) => {
  switch (action.type) {
    case INVALIDATE_SECTION:
    return Object.assign({}, state, {
      didInvalidate: true
    });
    case REQUEST_PLANTS:
    return Object.assign({}, state, {
      isFetching: true,
      didInvalidate: false,
    });
    case RECEIVE_PLANTS:
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: false,
      items: action.plants,
      sectionName: action.sectionName
    });
    default:
    return state;
  }
}

export function plantsBySection(state = { }, action) {
  switch (action.type) {
    case INVALIDATE_SECTION:
    case RECEIVE_PLANTS:
    case REQUEST_PLANTS:
      return Object.assign({}, state, {
        [action.sectionName]: plants(state[action.sectionName], action)
      });
    default:
    return state
  }
}




// export function getAllSections(state = {}, action) {
//   switch (action.type) {
//     case GET_SECTIONS_REQUEST:
//       return Object.assign({}, state, {
//         plants: allSections(state, action)
//       });
//     default:
//       return state
//   }
// }

// const allSections = state => next => action => {
//     if (!action.promise) {
//       return next(action);
//     }
//
//     function makeAction(ready, data) {
//       let newAction = Object.assign({}, action, { ready }, data)
//       delete newAction.promise
//       return newAction;
//     }
//
//     next(makeAction(false))
//       return action.promise.then(
//         result => next(makeAction(true, { result })),
//         error => next(makeAction(true, { error }))
//       );
//       return state
// }
