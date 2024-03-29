import {rootUrl, handleErrors, afterAuth} from './common'
import axios from 'axios'

const baseUrl = rootUrl

export function facebookLogin(user_id) {
  return axios.get(baseUrl + 'facebook_login/' + user_id)
    .then(handleErrors())
}

export function facebookSignUp(body) {
  return axios.post(baseUrl+'facebook_signup',
    body
  ).then(handleErrors())
}

export function getUser(user_id) {
  return axios.get(baseUrl + 'users/' + user_id).then(handleErrors())
}

export function getUserValidated() {
  return afterAuth((userid)=>getUser(userid))
}