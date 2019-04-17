import {
  READ_ARTICLE_BEGIN,
  READ_ARTICLE_SUCCESS,
  READ_ARTICLE_FAILURE,
  DELETE_ARTICLE,
  UPDATE_ARTICLE,
  // LIKE_ARTICLE,
  CHANGE_TAB,
} from '../constants/action_types'

const initialState = {
  articles: [],
  loading: false,
  error: null,
};

function blogReducer(state = initialState, action) {
  //can't break immutability
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

    

    
    default:
      return state;
  }
}


export default blogReducer;