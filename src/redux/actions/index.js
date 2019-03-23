import {ADD_ARTICLE, DELETE_ARTICLE} from '../constants/action_types'
export function addArticle(payload) {
  return { type: ADD_ARTICLE, payload }
};
export function deleteArticle(id) {
  return { type: DELETE_ARTICLE, id }
}