import {
  READ_ARTICLE_BEGIN,
  READ_ARTICLE_SUCCESS,
  READ_ARTICLE_FAILURE,
  DELETE_ARTICLE,
  UPDATE_ARTICLE,
  LIKE_ARTICLE,
  CHANGE_TAB,
} from '../constants/action_types'

import {
  date_to_str
} from '../../components/format'

const initialState = {
  articles: [],
  tabIx: 0,
  loading: false,
  error: null,
};

function rootReducer(state = initialState, action) {
  //can't break immutability
  console.log(action)
  switch (action.type) {
    case READ_ARTICLE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case READ_ARTICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        articles: action.articles
      }

    case READ_ARTICLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        // articles: []
      }


    case DELETE_ARTICLE:
      return Object.assign({}, state, {
        articles: state.articles.filter(({
          postid
        }) => (postid !== action.id))
      });

    case UPDATE_ARTICLE:
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

    case LIKE_ARTICLE:
      return Object.assign({}, state, {
        articles: state.articles.map((item) => {
          if (item.id !== action.id) {
            return item
          }
          return {
            ...item,
            like: item.like + 1
          }
        })
      })

    case CHANGE_TAB:
      return Object.assign({}, state, {
        tabIx: action.ix
      })

    default:
      return state;
  }
}


export default rootReducer;
export {
  initialState
}