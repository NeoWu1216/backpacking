export const rootUrl = 'http://127.0.0.1:8000/'
export function handleErrors(ok=200) {
  return response => {
    
    if (response.status != ok) {
      console.warn('Response not OK')
      throw Error(response.message);
    }

    return response;
  }
}

export function getMessage(err) {
  let message = err.toString()
  if (err.response!==undefined && err.response.data!==undefined)
    message = err.response.data.Message
  return message
}

export function getStatusCode(err) {
  return err.response.status
}