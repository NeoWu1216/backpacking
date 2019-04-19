import { getSession, validateSession } from '../components/auth/utils'
import { facebookLogin } from './user'

export const rootUrl = 'http://127.0.0.1:8000/'
export function handleErrors(ok = 200) {
  return response => {

    if (response.status != ok) {
      console.warn('Response not OK')
      throw Error(response.message);
    }

    return response.data;
  }
}



export function getMessage(err) {
  let message = err.toString()
  if (err.response !== undefined
    && err.response.data !== undefined
    && err.response.data.Message != undefined)
    message = err.response.data.Message
  return message
}

export function getStatusCode(err) {
  return err.response.status
}

export function afterAuth(callback) {
  let { userId, token } = getSession()
  return validateSession(userId, token).then(callback)
}

export function unsecureAuth(callback) {
  let { userId } = getSession()
  return facebookLogin(userId).then((res)=>{
    if (res.data === null) throw res
    return res.data
  }).then(
    callback
  )
}