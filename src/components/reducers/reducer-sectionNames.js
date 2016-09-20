import CONSUME_SECTIONAMES from '../actions/index';

const INITIAL_STATE = []

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CONSUME_SECTIONAMES:
      return action.payload
    default:
      return state
  }
}
