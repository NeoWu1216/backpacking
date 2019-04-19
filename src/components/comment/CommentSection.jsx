import React, { Component } from 'react'
import { parseComments, convertCommentsToUI } from './utils.jsx'
import { Message, Button, Comment, Form, Header } from 'semantic-ui-react'
import { getMessage } from '../../crud/common'
import {withRouter} from 'react-router-dom'
import { readComments, createComment } from '../../crud/comment'
import { getSession, validateSession } from '../auth/utils'

class CommentSection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      commentList: [],
      hidden: true,
      parentId : "None",
      parentUser: "",
      parentContent: "",
      content: "",
      formState: "",
      message: ""
    }
  }

  loadComments() {
    readComments(this.props.blogId).then((data)=>{
      this.setState({commentList : data})
    }).catch((err) => {
      console.error("load comment failed",getMessage(err))
    })
  }

  componentDidMount() {
    this.loadComments()
  }

  onReply = (c) => (e) => {
    this.setState({
      hidden: false,
      parentId : c.commentid,
      parentUser: c.author_name,
      parentContent: c.content
    })
  }

  onSubmit = (e) => {
    let {parentId, content} = this.state
    createComment({content, parent_id:parentId,
    post_id:this.props.blogId}).then(()=>{
      this.setState({
        formState : 'success',
        message: "New comment successfully created!",
        content : "",
        parentId : "None",
        parentUser: "",
        parentContent: "",
        content: "",
        hidden: true,
      })
      this.loadComments()
    }).catch((err)=>{
      let message = getMessage(err)
      this.setState({
        formState : 'error',
        message
      })
    })
  }

  onInputChange = (e) => {
    this.setState({ [e.target.id]: e.target.value })
  }

  redirectUser = (userid) => {
    this.props.history.push('/dashboard/user/'+userid)
  }

  render() {
    let { commentList, hidden, parentUser, parentContent, content, formState}
      = this.state
    let comments = parseComments(commentList)
    return (
      <Comment.Group className='centered twelve wide column'>
        <h1> Comment Section </h1>
        {convertCommentsToUI(comments, this.onReply, this.redirectUser)}
        <Form reply 
          className='center'
          loading={formState === 'loading'}
          success={formState === 'success'}
          error={formState === 'error'}
          >
          <Form.TextArea
            placeholder='Content'
            value={content}
            id='content'
            onChange={this.onInputChange}
          />
          <Message
            icon='reply'
            header={'To: ' + parentUser}
            content={'Parent comment: ' + parentContent}
            hidden={hidden}
          />
          <Message success header='Form Success' content={this.state.message} />
          <Message error header='Form Failure' content={this.state.message} />
          <Button content='Post' labelPosition='left' icon='edit' primary onClick={this.onSubmit}/>
        </Form>
      </Comment.Group>
    )

  }
}
export default withRouter(CommentSection)