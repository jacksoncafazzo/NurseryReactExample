import CONSUME_GENUS from '../actions/index';

const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CONSUME_GENUS:
      return [...state, action.payload]
    default:
      return state
  }
}
