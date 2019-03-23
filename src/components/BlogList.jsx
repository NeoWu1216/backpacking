import React, { Component } from 'react'
import {Card, Icon} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {abbrev, date_to_str} from './format'
import {addArticle, deleteArticle} from '../redux/actions/index'

const mapStateToProps = (state) => {
  return {articles : state.articles}
}

const mapDispatchToProps = (dispatch) => {
  return {
    addArticle : article => dispatch(addArticle(article)),
    deleteArticle : article => dispatch(deleteArticle(article))
  }
}

class BlogList extends Component {
  onEdit() {

  }
  onDelete(id) {
    this.props.deleteArticle(id)
  }

  render() {
    const {articles} = this.props;
    return (
    <Card.Group className="container-fluid">
      {articles.map(atc => (
        <Card key = {atc.id}>
        <Card.Content>
          <Card.Header>{atc.title}</Card.Header>
          <Card.Meta>
            <span className='date'>
              {date_to_str(atc.date_created)}
            </span>
          </Card.Meta>
          <Card.Description>
            {abbrev(atc.content, 200)}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name='like' 
                  
            />
            {atc.like} Likes
          </a>
        </Card.Content>
        <Card.Content extra>
        <div className="ui buttons">
          <button 
            className="ui button positive" 
            onClick={this.onEdit()}>
            Edit
          </button>
          <div className="or"></div>
          <button 
            className="ui button negative" 
            onClick={()=>this.onDelete(atc.id)}>
            Delete
          </button>
        </div>
        </Card.Content>
      </Card>
      ))}
    </Card.Group>
    )
  }
}

BlogList = connect(mapStateToProps, mapDispatchToProps)(BlogList);
export default BlogList;