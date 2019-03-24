import React, { Component } from 'react'
import {Card, Icon} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {abbrev} from '../format'
import {deleteArticle, changeTab, likeArticle} from '../../redux/actions/index'
import {withRouter} from 'react-router-dom'
import {Popup} from 'semantic-ui-react'


const mapDispatchToProps = (dispatch) => {
  return {
    changeTab : (...args) => (dispatch(changeTab(...args))),
    deleteArticle : article => dispatch(deleteArticle(article)),
    likeArticle : (...args) => dispatch(likeArticle(...args)),
  }
}

class BlogList extends Component {
  componentWillMount() {
    this.props.changeTab(0)
  }
  onEdit(e,id) {
    e.stopPropagation()
    this.props.history.push('/dashboard/blogs/update/'+id)
  }
  onDelete(e,id) {
    e.stopPropagation()
    this.props.deleteArticle(id)
  }
  onLike(e, id) {
    e.stopPropagation()
    this.props.likeArticle(id)
  }
  onClickDetails(id) {
    this.props.history.push('/dashboard/blogs/details/'+id)
  }


  render() {
    const {articles} = this.props;
    return (
    <Card.Group className="container-fluid">
      {articles.map(atc => (
        <Card key = {atc.id} onClick={()=>this.onClickDetails(atc.id)}>
        <Card.Content>
          <Card.Header >
              {abbrev(atc.title, 50)}
          </Card.Header>
          <Card.Meta>
            <span className='date'>
              {(atc.dateCreated)}
            </span>
          </Card.Meta>
          <Card.Description>
            {abbrev(atc.content, 200)}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a onClick={(e)=>this.onLike(e,atc.id)}>
            <Icon name='like' 
            />
            {atc.like} Likes
          </a>
        </Card.Content>
        <Card.Content extra>
        <div className="ui buttons">
          <button 
            className="ui button positive" 
            onClick={(e)=>this.onEdit(e,atc.id)}>
            Edit
          </button>
          <div className="or"></div>
          <Popup trigger={
              <button 
                className="ui button negative" 
                onClick={(e,)=>this.onDelete(e,atc.id)}>
                Delete
              </button>
            }
            inverted
            content = "Warning: can't undo delete"
          />
        </div>
        </Card.Content>
      </Card>
      ))}
    </Card.Group>
    )
  }
}

BlogList = connect(null, mapDispatchToProps)(BlogList);
export default withRouter(BlogList);