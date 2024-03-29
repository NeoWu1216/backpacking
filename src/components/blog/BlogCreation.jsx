import React, { Component } from 'react'
import { changeTab } from '../../redux/actions'
import { createBlog, readBlogs } from '../../crud/blog'
import { getMessage } from '../../crud/common'

import { newId } from '../format'
import { connect } from 'react-redux'
import { Form, Button, Message } from 'semantic-ui-react'
import Textarea from 'react-textarea-autosize';
import {withRouter} from 'react-router-dom'
import {date_to_str} from '../format'

const mapDispatchToProps = (dispatch) => {
  return {
    loadArticles : () => readBlogs()(dispatch),
    changeTab : (...args) => (dispatch(changeTab(...args))),
  }
}

class BlogCreation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      content: "",
      formState: "",
      message: ""
    }
  }

  componentWillMount() {
  }

  redirectAfterSubmit = (timeout) => {
    setTimeout(()=>this.props.history.push('/dashboard'), timeout)
  }


  onInputChange = (e) => {
    this.setState({ [e.target.id]: e.target.value })
  }

  submit = () => {
    let { title, content } = this.state;
    if (title.length === 0) {
      this.setState({
        formState: "error",
        message: "Blog title can't be empty"
      })
    } else if (title.length >= 500) {
      this.setState({
        formState: "error",
        message: "Blog title can be at most 500 chars long"
      })
    } else if (content.length >= 10000) {
      this.setState({
        formState: "error",
        message: "Blog content can be at most 10000 chars long"
      })
    } else {
      // TODO: improve asyncness
      this.setState({ formState: 'loading' })
      this.onCreate(title, content)
    }
  }

  onCreate(title, content) {
    let article = { title, content, id: newId(), create_time: date_to_str(new Date()), like: 0}
    createBlog(article).then((res) => {
      this.setState({
        formState: 'success',
        message: "Blog successfully created!"
      }, ()=>{this.redirectAfterSubmit(500)})
      this.props.loadArticles()
    }).catch((err) =>{
      let message = getMessage(err)
      this.setState({
        formState : 'error',
        message
      })
    })
  }

  render() {
    let { formState } = this.state;
    return (
      <Form
        loading={formState === 'loading'}
        success={formState === 'success'}
        error={formState === 'error'}
        className="container-fluid"
      >
        <Form.Field>
          <label>Title</label>
          <input
            type='text'
            placeholder='Title'
            value={this.state.title}
            id='title'
            onChange={this.onInputChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Content</label>
          <Textarea
            placeholder='Content'
            value={this.state.content}
            id='content'
            onChange={this.onInputChange}
          />
        </Form.Field>
        <Message success header='Form Success' content={this.state.message} />
        <Message error header='Form Failure' content={this.state.message} />
        <Button type='submit' onClick={this.submit}>Submit</Button>
      </Form>
    )
  }
}

BlogCreation = connect(null, mapDispatchToProps)(BlogCreation);
export default withRouter(BlogCreation);