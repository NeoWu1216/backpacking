import React, { Component } from 'react'
import {Card, Icon, Container, Label} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {deleteBlog, readBlogs} from '../../crud/blog'
import {withRouter} from 'react-router-dom'
import NotFound from './BlogNotFound'
import {Popup} from 'semantic-ui-react'
import {getMessage} from '../../crud/common'
import CommentSection from '../comment/CommentSection'
import { likePost, unlikePost } from '../../crud/like'
import '../main.css'

const mapStateToProps = (state) => {
  return {articles : state.blog.articles}
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     deleteArticle : article => dispatch(deleteArticle(article)),
//     likeArticle : (...args) => dispatch(likeArticle(...args)),
//   }
// }


const mapDispatchToProps = (dispatch) => {
  return {
    loadArticles : () => readBlogs()(dispatch),
  }
}

class BlogDetails extends Component {
  onEdit(id) {
    this.props.history.push('/dashboard/blogs/update/'+id)
  }

  

  onDelete(id, author) {
    deleteBlog(id, author).then((res)=>{
      this.props.loadArticles()
     }).catch((err)=>{
      let message = getMessage(err)
      alert(message)
    })
  }

  onLike(atc) {
    if (!atc.like) {
      likePost(atc.postid).then(()=> {
        this.props.loadArticles()
      }).catch((err)=>{
        let message = getMessage(err)
        alert(message)
      })
    } else {
      unlikePost(atc.postid).then(()=>{
        this.props.loadArticles()
      }).catch((err)=>{
        let message = getMessage(err)
        alert(message)
      })
    }
  }

  redirectProfile = (uid) => () => {
    this.props.history.push('/dashboard/user/'+uid)
  }

  render() {
    const {articles, match} = this.props;
    let atc = articles.find(({postid})=>postid==match.params.id)
    if (atc === undefined)
      return <NotFound/>

    return (
        <Card fluid className='ui centered align grid'>

        <Card.Content>
          <Card.Header>{atc.title}</Card.Header>
          <Card.Meta>
            <span className='date'>
              {atc.create_time}
            </span>
          </Card.Meta>

          <Label as='a' color='blue' image onClick={this.redirectProfile(atc.author)}>
              <img src={atc.author_avatar}/>
              {atc.author_name}
          </Label>
          <br/>

          <Container textAlign='justified'>
          <Card.Description className='blog'>
            {atc.content}
          </Card.Description>
          </Container>
        </Card.Content>
        <Card.Content extra >
          <div onClick={()=>this.onLike(atc)}>
            <Icon name='like' color={(atc.like) ? 'red' : 'grey'}
            />
            {atc.likenum} Likes
          </div>
        </Card.Content>
        <Card.Content extra>
        <div className="ui buttons">
          <button 
            className="ui button positive" 
            onClick={()=>this.onEdit(atc.postid)}>
            Edit
          </button>
          <div className="or"></div>
          <Popup trigger={
              <button 
                className="ui button negative" 
                onClick={()=>this.onDelete(atc.postid, atc.author)}>
                Delete
              </button>
            }
            inverted
            content = "Warning: can't undo delete"
          />
        </div>
        </Card.Content>

        <hr/>
        <CommentSection blogId={match.params.id}/>
      </Card>
    )
  }
}

BlogDetails = connect(mapStateToProps, mapDispatchToProps)(BlogDetails);
export default withRouter(BlogDetails);