import {rootUrl, handleErrors} from './common'
import axios from 'axios'
import {getUser} from './user'
import {afterAuth} from './common'

const baseUrl = rootUrl + 'comment/'


export function readComments(blogId) {
  return afterAuth(()=>{
    return axios.get(rootUrl + 'blogpost/' + blogId + '/comments')
      .then(handleErrors())
      .then(json => {
        return json.data
      })
      .then(data => {
        return Promise.all(data.map((elem)=>{
          return getUser(elem.userid).then((res)=>{
            let {email, profile_pic, username} = res.data
            elem.author_email = email
            elem.author_name = username
            elem.author_avatar = profile_pic
            return elem
          })
        }))
      })
  })
}

export function createComment(data) {
  return afterAuth((userId)=>{
    return axios.post(baseUrl + 'create/', 
      {...data, userid:userId}
    ).then(handleErrors())
  })
}
