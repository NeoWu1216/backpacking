import axios from 'axios'
import { rootUrl, handleErrors, afterAuth} from './common'

const baseUrl = rootUrl + 'blogpost/'

export function likePost(postid) {
  return afterAuth((userid)=>{
    return axios.post(baseUrl+'likepost', {postid, userid}).then(handleErrors())
  })
}

export function unlikePost(postid) {
  return afterAuth((userid)=>{
    return axios.post(baseUrl+'deletelikepost', {postid, userid}).then(handleErrors())
  })
}

export function getLike(postid, userid) {
  return axios.get(baseUrl+userid+'/likes')
  .then(handleErrors())
  .then((data)=> {
    return data.filter((data)=>data.postid==postid).length >= 1
  })
}