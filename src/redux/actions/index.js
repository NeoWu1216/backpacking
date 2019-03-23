import {
  ADD_ARTICLE,
  DELETE_ARTICLE,
  UPDATE_ARTICLE,
  LIKE_ARTICLE,
  CHANGE_TAB
} from '../constants/action_types'

export function addArticle(payload) {
  return {
    type: ADD_ARTICLE,
    payload
  }
};
export function deleteArticle(id) {
  return {
    type: DELETE_ARTICLE,
    id
  }
};
export function updateArticle(id, payload) {
  return {
    type: UPDATE_ARTICLE,
    id,
    payload
  }
};
export function likeArticle(id) {
  return {
    type: LIKE_ARTICLE,
    id
  }
};
export function changeTab(ix) {
  return {
    type: CHANGE_TAB,
    ix
  }
}