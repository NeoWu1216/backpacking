import {
  ADD_ARTICLE,
  DELETE_ARTICLE,
  UPDATE_ARTICLE,
  LIKE_ARTICLE,
  CHANGE_TAB
} from '../constants/action_types'

import {
  date_to_str
} from '../../components/format'

const initialState = {
  articles: [{
    title: 'React Redux Tutorial for Beginners',
    id: "1",
    content:`
    Despite the great resources out there I couldn’t wrap my head around some of the Redux concepts.
    I knew what’s the state. But actions, action creators, and reducers? They were obscure for me.`,
    dateCreated: date_to_str(new Date(2019, 2, 21, 10)),
    like: 22,
  }, {
    title: 'How to Pack a Backpack for a Hiking Trip',
    id: "2",
    content: `
    Backpacks have come a long way since the 70’s, when hikers swore by (and at) bulky external frames and nifty side pockets were few and far between. Nowadays, there’s any number of high-tech packs that help you lug more gear longer, and farther, than ever before. But it's still critical that you know how to pack a backpack right.

    If you're headed out for a beach vacation or a family reunion, there's nothing wrong with throwing your belongings in a bag and calling it good. But hitting the trail is different: You'll be carrying your pack for hours, days, or even weeks at a time, so balance and comfort are tantamount. Carefully loading up your backpack can even keep you safer: On tricky scrambles or exposed trails, a well-loaded backpack will help you keep your balance and prevent nasty falls.
    
    Here, we'll cover some of the most important tips for getting your backpack ready for the trail.`,
    dateCreated: date_to_str(new Date(2019, 2, 17, 10)),
    like: 11,
  }, {
    title: 'XSS attack',
    id: "3",
    content: `<script type='application/javascript'>alert('xss');</script>`,
    dateCreated: date_to_str(new Date(2019, 1, 11, 10)),
    like: 0,
  }], 
  tabIx: 0
};

function rootReducer(state = initialState, action) {
  //can't break immutability
  if (action.type === ADD_ARTICLE) {
    return Object.assign({}, state, {
      articles: state.articles.concat(action.payload)
    });
  } 
  else if (action.type === DELETE_ARTICLE) {
    return Object.assign({}, state, {
      articles: state.articles.filter(({
        id
      }) => (id !== action.id))
    });
  } 
  else if (action.type === UPDATE_ARTICLE) {
    return Object.assign({}, state, {
      articles: state.articles.map((item) => {
        if (item.id !== action.id) {
          return item
        }
        return {
          ...item,
          ...action.payload
        }
      })
    })
  } 
  else if (action.type === LIKE_ARTICLE) {
    return Object.assign({}, state, {
      articles: state.articles.map((item) => {
        if (item.id !== action.id) {
          return item
        }
        return {
          ...item, 
          like : item.like+1
        }
      })
    })
  } else if (action.type === CHANGE_TAB) {
    return Object.assign({}, state, {
      tabIx: action.ix
    })
  }
  return state;
  };
export default rootReducer;
export {
  initialState
}