import axios from 'axios'
import {facebookLogin} from '../../crud/user'
const appId = '308146293191952'
const appToken = '308146293191952|YyNRhM3-FBYa9wnMEsISq91E08Y'

// const appId = '2229624800467574'
// const appToken = '2229624800467574|el1y2WiegHHo8GrlPhTQJ54yi6A'


function saveSession(userId, token) {
  sessionStorage.setItem('userId', userId)
  sessionStorage.setItem('token', token)
}

function clearSession(userId, token) {
  sessionStorage.setItem('userId', '')
  sessionStorage.setItem('token', '')
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
          if (!is_valid || user_id !== userId) throw "Authentication failed, userid don't match or is not valid!"
          return response
        }).then((response)=> {
          return facebookLogin(response.data.data.user_id).then((res)=>{
            if (res.data === null) throw res
            return res.data
          })
        })
}



export {appId, saveSession, getSession, validateSession, clearSession}