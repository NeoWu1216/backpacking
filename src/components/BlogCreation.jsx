import React, { Component } from 'react'
import {addArticle, deleteArticle} from '../redux/actions/index'
import {newId} from './format'
import {connect} from 'react-redux'
import {Form, Button, Message, TextArea} from 'semantic-ui-react'

const mapDispatchToProps = (dispatch) => {
  return {
    addArticle : article => dispatch(addArticle(article)),
  }
}

class BlogCreation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title : "",
      content : "",
      formState : ""
    }
  }

  onCreate(title, content) {
    this.props.addArticle({title, content, id:newId(), dateCreated:new Date(),like:0})
  }

  onInputChange = (e) => {
    this.setState({[e.target.id]: e.target.value})
  }

  submit = () => {
    let {title, content} = this.state;
    if (title.length === 0) {
      this.setState({formState : 'error'})
    } else {
      this.setState({formState : 'loading'})
      this.onCreate(title, content)
      this.setState({formState : 'success'})
    }
  }

  render() {
    let {formState} = this.state;
    return (
      <Form 
        loading={formState==='loading'} 
        success={formState==='success'}
        error={formState==='error'}
        className="container-fluid"
      >
        <Form.Field>
          <label>Title</label>
          <input 
            type='text' 
            placeholder='Title' 
            value={this.state.title}
            id = 'title'
            onChange = {this.onInputChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Content</label>
          <TextArea
            rows = '5' 
            placeholder='Content' 
            value={this.state.content}
            id = 'content'
            onChange = {this.onInputChange}
          />
        </Form.Field>
        <Message success header='Form Success' content="Blog successfully created!" />
        <Message error header='Form Failure' content="Blog title can't be empty" />

        <Button type='submit' onClick={this.submit}>Submit</Button>
      </Form>
    )
  }
}

BlogCreation = connect(null,mapDispatchToProps)(BlogCreation);
export default BlogCreation;