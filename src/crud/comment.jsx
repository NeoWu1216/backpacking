import {rootUrl, handleErrors} from './common'
import axios from 'axios'
const baseUrl = rootUrl + 'comment/'


export function readComments(blogId) {
  return (
    axios.get(rootUrl + 'blogpost/' + blogId + 'comments')
      .then(handleErrors())
  )
}

export function createComment(data) {
  return (
    axios.post(baseUrl + 'create', 
      data
    ).then(handleErrors())
  )
}
