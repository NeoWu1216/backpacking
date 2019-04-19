import axios from 'axios'
import { rootUrl, handleErrors, afterAuth, unsecureAuth} from './common'
import { readArticleBegin, readArticleFailure, readArticleSuccess } from '../redux/actions'
import { getUser } from './user'
import { getSession } from '../components/auth/utils'
import {getLike} from './like'

const baseUrl = rootUrl + 'blogpost/'

export function readBlogs() {
  // read blog is relatively not important
  // can loosen read limit by not additional validate
  let fbId = getSession().userId
  return dispatch => {
    dispatch(readArticleBegin())
    unsecureAuth(fbId).then(userId=>{
      return axios.get(baseUrl + 'list/')
      .then(handleErrors())
      .then(data => {
        return Promise.all(data.map((elem)=>{
          return getUser(elem.author).then((res)=>{
            let {email, profile_pic, username} = res
            elem.author_email = email
            elem.author_name = username
            elem.author_avatar = profile_pic
            return elem
          }).then((elem)=> {
            return getLike(elem.postid, userId).then((like)=>{
              elem.like = like
              return elem
            })
          })
        }))
      })})
      .then((data)=>{
        dispatch(readArticleSuccess(data));
        return data
      })
      .catch(error => {
        dispatch(readArticleFailure(error))
        console.error('read article failed', error)
      });
  }
}

export function createBlog(blog) {
  return afterAuth((author)=>{
    return axios.post(baseUrl + 'create',
      {...blog, author}
    ).then(handleErrors())
  })
}

export function updateBlog(blog) {
  return afterAuth((uid)=>{
    if (uid !== blog.author) throw "Can't modify other's blog!"
    return axios.put(baseUrl + 'update/' + blog.postid,
      blog
    ).then(handleErrors())
  })
}

export function deleteBlog(id, author) {
  return afterAuth((uid)=>{
    if (uid !== author) throw "Can't delete other's blog!"
    return axios.delete(baseUrl + 'delete/' + id
    ).then(handleErrors())
  })
}



