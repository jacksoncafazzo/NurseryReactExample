import CONSUME_PLANTS from '../actions/index';

const INITIAL_STATE = {plants: {}};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CONSUME_PLANTS:
      return Object.assign({}, state, {
        plants: action.payload
      })
    default:
      return state
  }
}
