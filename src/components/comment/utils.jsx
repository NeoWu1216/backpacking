import React from 'react'
import { Button, Comment, Form, Header } from 'semantic-ui-react'

function parseCommentHelper(comments, root) {
  let elems = comments.filter((c)=>(c.parentid === root))
  let left = comments.filter((c)=>(c.parentid !== root))
  elems.forEach((c) => {
    let res = parseCommentHelper(left, c.commentid)
    c.children = res.elems
    left = res.left
  })
  return {elems, left}
}




function parseComments(comments) {
  return parseCommentHelper(comments, null).elems
}

function convertCommentsToUIHelper(comments, onReply) {
    return comments.map((c)=>{return (
      <Comment >
      <Comment.Avatar src='' />
      <Comment.Content>
        <Comment.Author as='a'>{c.username}</Comment.Author>
        <Comment.Metadata>
          <div>{c.comment_time}</div>
        </Comment.Metadata>
        <Comment.Text>{c.content}</Comment.Text>
        <Comment.Actions>
          <Comment.Action onClick={onReply}>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
      <Comment.Group size='small'>
        {convertCommentsToUIHelper(c.children, onReply)}
      </Comment.Group>
      </Comment>
    )})
}


function convertCommentsToUI(comments, onReply) {
  return (
    convertCommentsToUIHelper(comments, onReply)
  )
}

export {parseComments, convertCommentsToUI}



