import React, { Component } from 'react'
import {updateArticle} from '../../redux/actions'
import {connect} from 'react-redux'
import {Form, Button, Message} from 'semantic-ui-react'
import Textarea from 'react-textarea-autosize';
import {withRouter} from 'react-router-dom'
import NotFound from './BlogNotFound'
import {readBlogs, updateBlog} from '../../crud/blog'
import {getMessage} from '../../crud/common'


const mapStateToProps = (state) => {
  return {articles : state.blog.articles}
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadArticles : () => readBlogs()(dispatch),
    updateArticle : (...args) => dispatch(updateArticle(...args)),
  }
}

class BlogUpdate extends Component {
  constructor(props) {
    super(props)
    const {articles, match} = this.props;
    let id = match.params.id;
    this.article = articles.find((art)=>(id==art.postid));

    this.state = {
      title : (this.article!==undefined) ? this.article.title : undefined,
      content : (this.article!==undefined) ? this.article.content : undefined,
      formState : "",
      message: ""
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.articles.length !== this.props.articles.length) {
      this.article = nextProps.articles.find((art)=>(this.props.match.params.id==art.postid));
      if (this.article)
        this.setState({title: this.article.title, content: this.article.content})
    }
  } 


  onUpdate(newArticle) {
    // this.props.updateArticle(id, {title, content})
    updateBlog(newArticle).then((res)=>{
      this.setState({
        formState: 'success',
        message: "Blog successfully updated!"
      }, ()=>this.redirectAfterSubmit(500))
      this.props.loadArticles()
    }).catch((err)=>{
      let message = getMessage(err)
      console.error('update failed', message)

      this.setState({
        formState: 'error',
        message
      })
    })
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
      this.article.title = title
      this.article.content = content
      this.onUpdate(this.article)
    }
  }

  render() {
    let {formState} = this.state;
    this.article = this.props.articles.find((art)=>(this.props.match.params.id==art.postid));

    if (this.article === undefined)
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