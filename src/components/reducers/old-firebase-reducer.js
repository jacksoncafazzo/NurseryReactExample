import { GET_SECTION, GET_SECTIONS, GET_SECTIONS_REQUEST, GET_SECTION_REQUEST, GET_SECTIONS_SUCCESS, GET_SECTIONS_FAILURE } from '../actions/types';


export default function(state = [], action) {
    switch (action.type) {
      case GET_SECTION:
        return [... state, { sections: action.payload }]
      case GET_SECTIONS:
        return [...state, { sections: action.payload }]
      case GET_SECTION_REQUEST:
        return [...state, { sections: action.payload }]
      case GET_SECTIONS_REQUEST:
        return [...state, { sections: action.payload }]
      case GET_SECTIONS_SUCCESS:
        return [...state, { sections: action.payload }]
      case GET_SECTIONS_FAILURE:
          return [...state, { error: action.payload }];
      default:
        return state;
    }
}
