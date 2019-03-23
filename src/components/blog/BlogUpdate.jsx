import React, { Component } from 'react'
import {updateArticle} from '../../redux/actions/index'
import {connect} from 'react-redux'
import {Form, Button, Message} from 'semantic-ui-react'
import Textarea from 'react-textarea-autosize';
import {withRouter} from 'react-router-dom'
import NotFound from './BlogNotFound'

const mapStateToProps = (state) => {
  return {articles : state.articles}
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateArticle : (...args) => dispatch(updateArticle(...args)),
  }
}

class BlogUpdate extends Component {
  constructor(props) {
    super(props)
    let id = props.match.params.id;
    let article = props.articles.find((art)=>(id==art.id));

    this.state = {
      id,
      article,
      title : (article!==undefined) ? article.title : undefined,
      content : (article!==undefined) ? article.content : undefined,
      formState : "",
      message: ""
    }
  }

  onUpdate(title, content) {
    let id = this.state.id
    this.props.updateArticle(id, {title, content})
  }

  onInputChange = (e) => {
    this.setState({[e.target.id]: e.target.value})
  }

  redirectAfterSubmit = (timeout) => {
    setTimeout(()=>this.props.history.goBack(), timeout)
  }

  submit = () => {
    let {title, content} = this.state;
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
      this.setState({formState : 'loading'})
      this.onUpdate(title, content)
      this.setState({
        formState: 'success',
        message: "Blog successfully created!"
      }, ()=>this.redirectAfterSubmit(500))
    }
  }

  render() {
    let {formState, article} = this.state;
    if (article === undefined)
      return <NotFound/>
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
          <Textarea
            placeholder='Content' 
            value={this.state.content}
            id = 'content'
            onChange = {this.onInputChange}
          />
        </Form.Field>
        <Message success header='Form Success' content={this.state.message} />
        <Message error header='Form Failure' content={this.state.message} />
        <Button type='submit' onClick={this.submit}>Submit</Button>
      </Form>
    )
  }
}

BlogUpdate = connect(mapStateToProps,mapDispatchToProps)(BlogUpdate);
export default withRouter(BlogUpdate);