import React, { Component } from 'react'
import {Card, Icon} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {deleteBlog, readBlogs} from '../../crud/blog'
import {withRouter} from 'react-router-dom'
import NotFound from './BlogNotFound'
import {Popup} from 'semantic-ui-react'
  
const mapStateToProps = (state) => {
  return {articles : state.articles}
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

  

  onDelete(id) {
    deleteBlog(id).then((res)=>{
      readBlogs().then(
        this.props.loadArticles()
      )
     }).catch((err)=>
      console.error(err)
    )
  }

  onLike(id) {
    let article = this.props.articles.find(({postid})=>postid==id);
    article.like += 1; //doesn't work
  }

  render() {
    const {articles, match} = this.props;
    let atc = articles.find(({postid})=>postid==match.params.id)
    if (atc === undefined)
      return <NotFound/>

    return (
        <Card fluid>
        <Card.Content>
          <Card.Header>{atc.title}</Card.Header>
          <Card.Meta>
            <span className='date'>
              {atc.create_time}
            </span>
          </Card.Meta>
          <Card.Description style={{whiteSpace:'pre-wrap'}}>
            {atc.content}
          </Card.Description>
        </Card.Content>
        <Card.Content extra >
            <a onClick={()=>this.onLike(match.params.id)}>
            <Icon name='like' 
            />
            {atc.like} Likes
            </a>
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
                onClick={()=>this.onDelete(atc.postid)}>
                Delete
              </button>
            }
            inverted
            content = "Warning: can't undo delete"
          />
        </div>
        </Card.Content>
      </Card>
    )
  }
}

BlogDetails = connect(mapStateToProps, mapDispatchToProps)(BlogDetails);
export default withRouter(BlogDetails);