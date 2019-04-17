import React, { Component } from 'react'
import {parseComments, convertCommentsToUI} from './utils.jsx'
import { Button, Comment, Form, Header } from 'semantic-ui-react'

const commentList = [{
  comment_time : '4/13/19',
  commentid : 1,
  content : '1 is first comment',
  postid : 1,
  userid : 1,
  parentid : null
}, {
  comment_time : '4/13/19',
  commentid : 2,
  content : ' 2 follows 1',
  postid : 1,
  userid : 1,
  parentid : 1
}, {
  comment_time : '4/13/19',
  commentid : 3,
  content : '3 follows 2',
  postid : 1,
  userid : 1,
  parentid : 2
}, {
  comment_time : '4/13/19',
  commentid : 4,
  content : '4 follows 1',
  postid : 1,
  userid : 1,
  parentid : 1
}, {
  comment_time : '4/13/19',
  commentid : 5,
  content : '5 is the first comment',
  postid : 1,
  userid : 1,
  parentid : null
}, {
  comment_time : '4/13/19',
  commentid : 6,
  content : '6 is the first comment',
  postid : 1,
  userid : 1,
  parentid : null
}, {
  comment_time : '4/13/19',
  commentid : 7,
  content : '7 follows 1',
  postid : 1,
  userid : 1,
  parentid : 1
}]

class CommentSection extends Component {
  onReply = (e) => {
    console.log(e.target)
  }

  render() {
    let comments = parseComments(commentList)
    return (
        <Comment.Group className='centered twelve wide column'>
          <h1> Comment Section </h1>
          {convertCommentsToUI(comments, this.onReply)}
          <Form reply className='center'>
            <Form.TextArea />
            <Button content='Add Reply' labelPosition='left' icon='edit' primary />
          </Form>
        </Comment.Group>
    )
    
  }
}
export default CommentSection