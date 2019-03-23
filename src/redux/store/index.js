import { createStore } from "redux";
import {addArticle} from '../actions/index'
import rootReducer from "../reducers/index";
import { persistStore, persistReducer} from 'redux-persist'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import storage from 'redux-persist/lib/storage'

// storage.removeItem('persist:root')

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler:hardSet
}
 
const persistedReducer = persistReducer(persistConfig, rootReducer)
 
let store = createStore(persistedReducer)
store.subscribe(() => console.log(store.getState()))
let persistor = persistStore(store)
export { store, persistor }