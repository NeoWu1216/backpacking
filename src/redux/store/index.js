import { createStore, applyMiddleware } from 'redux'
import rootReducer from "../reducers/rootReducer";
import thunk from 'redux-thunk';

let store = createStore(rootReducer, applyMiddleware(thunk))
store.subscribe(() => console.log(store.getState()))

export { store }