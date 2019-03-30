import axios from 'axios'
import {rootUrl} from './rootUrl'
import { readArticleBegin, readArticleFailure, readArticleSuccess } from '../redux/actions/index'
const baseUrl = rootUrl + 'blogpost/'

export function readBlogs() {
  return dispatch => {
    dispatch(readArticleBegin())
    axios.get(baseUrl + 'list/')
    .then(handleErrors())
    // .then(res => res.json())
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
    // .then(res => res.json())
  )
}

export function updateBlog(blog) {
  console.error(blog)
  return (
    axios.put(baseUrl + 'update/' + blog.postid,
      blog
    )
    .then(handleErrors())
    .then(res=> res.json)
  )
}

export function deleteBlog(id) {
  return (
    axios.delete(baseUrl + 'delete/' + id
    )
    .then(handleErrors())
    .then(res=> res.json)
  )
}



function handleErrors(ok=200) {
  return response => {
    console.log(response)
    if (response.status != ok) {
      console.warn('Response not OK')
      throw Error(response.statusText);
    }
    return response;
  }
}