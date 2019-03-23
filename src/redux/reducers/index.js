import {ADD_ARTICLE, DELETE_ARTICLE} from '../constants/action_types'
const initialState = {
  articles: [{ 
    title: 'React Redux Tutorial for Beginners', 
    id: 1,
    content: `Despite the great resources out there I couldn’t wrap my head around some of the Redux concepts.
    I knew what’s the state. But actions, action creators, and reducers? They were obscure for me.`,
    date_created: new Date(2019,2,21,10),
    like: 22,
  }]
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
      articles: state.articles.filter(({id}) => (id !== action.id))
    });
  }
  return state;
};  
export default rootReducer;
export {initialState}