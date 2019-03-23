import React, { Component } from 'react'
import {Card, Icon} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {deleteArticle, likeArticle} from '../../redux/actions/index'
import {withRouter} from 'react-router-dom'
import NotFound from './BlogNotFound'
import {Popup} from 'semantic-ui-react'
  
const mapStateToProps = (state) => {
  return {articles : state.articles}
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteArticle : article => dispatch(deleteArticle(article)),
    likeArticle : (...args) => dispatch(likeArticle(...args)),
  }
}

class BlogDetails extends Component {
  onEdit(id) {
    this.props.history.push('/dashboard/blogs/update/'+id)
  }
  onDelete(id) {
    this.props.deleteArticle(id)
  }
  onLike(id) {
    this.props.likeArticle(id)
  }

  render() {
    const {articles, match} = this.props;
    let atc = articles.find(({id})=>match.params.id==id)
    if (atc === undefined)
      return <NotFound/>

    return (
        <Card fluid>
        <Card.Content>
          <Card.Header>{atc.title}</Card.Header>
          <Card.Meta>
            <span className='date'>
              {atc.dateCreated}
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
            onClick={()=>this.onEdit(atc.id)}>
            Edit
          </button>
          <div className="or"></div>
          <Popup trigger={
              <button 
                className="ui button negative" 
                onClick={()=>this.onDelete(atc.id)}>
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