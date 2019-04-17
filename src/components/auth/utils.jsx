import axios from 'axios'
import {facebookLogin} from '../../crud/user'
const appId = '308146293191952'
const appToken = '308146293191952|YyNRhM3-FBYa9wnMEsISq91E08Y'

function saveSession(userId, token) {
  sessionStorage.setItem('userId', userId)
  sessionStorage.setItem('token', token)
}

function getSession() {
  let userId = sessionStorage.getItem('userId')
  let token = sessionStorage.getItem('token')
  return {userId, token}
}

/**
 * Return promise with parameters defined in storage
 * @param {*} userId 
 * @param {*} token 
 */
function validateSession(userId, token) {
  return axios.get('https://graph.facebook.com/debug_token?input_token='
        +token+'&access_token='+appToken).then((response)=> {
          let {is_valid, user_id} = response.data.data
          if (!is_valid || user_id !== userId) throw "Authentication failed!"
          return response
        }).then((response)=> {
          return facebookLogin(response.data.data.user_id).then((res)=>{
            if (res.data.data === null) throw response
            return res
          })
        })
}



export {appId, saveSession, getSession, validateSession}