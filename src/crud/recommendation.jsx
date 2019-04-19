import {rootUrl, handleErrors} from './common'
import axios from 'axios'
import {afterAuth} from './common'

export function getRecommendations(blogs) {
  return afterAuth((uid)=>{
    return axios.get(rootUrl + 'users/recommendpost/' + uid)
      .then(handleErrors())
      .then(data => {
        return Promise.all(data.map((arr)=>{
          let res = blogs.filter(({postid})=>(postid==arr[0]))
          return (res.length > 0) ? res[0] : null
        }))
      })
  })
}