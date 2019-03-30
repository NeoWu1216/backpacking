import {
  READ_ARTICLE_BEGIN,
  READ_ARTICLE_FAILURE,
  READ_ARTICLE_SUCCESS,
  DELETE_ARTICLE,
  UPDATE_ARTICLE,
  LIKE_ARTICLE,
  CHANGE_TAB
} from '../constants/action_types'

export function readArticleBegin(payload) {
  return {
    type: READ_ARTICLE_BEGIN,
    payload
  }
};

export function readArticleSuccess(articles) {
  return {
    type: READ_ARTICLE_SUCCESS,
    articles
  }
};

export function readArticleFailure(error) {
  return {
    type: READ_ARTICLE_FAILURE,
    error
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