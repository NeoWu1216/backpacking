import axios from 'axios'
import {rootUrl, handleErrors} from './common'
import { readArticleBegin, readArticleFailure, readArticleSuccess } from '../redux/actions'
const baseUrl = rootUrl + 'blogpost/'

export function readBlogs() {
  return dispatch => {
    dispatch(readArticleBegin())
    axios.get(baseUrl + 'list/')
    .then(handleErrors())
    .then(json => {
      dispatch(readArticleSuccess(json.data));
      return json.data;
    })
    .catch(error => {
      dispatch(readArticleFailure(error))
      console.error(error)
    });
  }
}

export function createBlog(blog) {
  return (
    axios.post(baseUrl + 'create', 
      blog
    )
    .then(handleErrors())
  )
}

export function updateBlog(blog) {
  console.error(blog)
  return (
    axios.put(baseUrl + 'update/' + blog.postid,
      blog
    )
    .then(handleErrors())
  )
}

export function deleteBlog(id) {
  return (
    axios.delete(baseUrl + 'delete/' + id
    )
    .then(handleErrors())
  )
}



