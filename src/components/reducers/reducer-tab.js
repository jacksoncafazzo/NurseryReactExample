import { SELECT_TAB } from '../actions/index'

export default function(state = 0, action) {
  switch (action.type) {
    case SELECT_TAB:
      return action.payload
    default:
      return state
  }
}
