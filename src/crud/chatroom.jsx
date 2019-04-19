import {rootUrl, handleErrors} from './common'
import axios from 'axios'
import {getUser} from './user'
import {afterAuth} from './common'

const baseUrl = 'http://localhost:8000'+'/chat/privateChat/'


export function createChat(data) {
  let {send_to} = data
  return afterAuth((userId)=>{
    console.log('check', send_to, userId)
    return axios.post(baseUrl, 
      {send_to, send_from:userId}
    ).then(handleErrors())
  })
}
