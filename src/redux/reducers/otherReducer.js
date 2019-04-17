import {
  CHANGE_TAB,
} from '../constants/action_types'

const initialState = {
  // articles: [],
  tabIx: 0,
};

function otherReducer(state = initialState, action) {
  //can't break immutability
  switch (action.type) {
    
    case CHANGE_TAB:
      return Object.assign({}, state, {
        tabIx: action.ix
      })

    default:
      return state;
  }
}

export default otherReducer;