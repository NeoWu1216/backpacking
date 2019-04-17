import React, { Component } from 'react'
import { Card, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { abbrev, date_to_str } from '../format'
import { changeTab, likeArticle } from '../../redux/actions'
import { withRouter } from 'react-router-dom'
import { Popup } from 'semantic-ui-react'
import { deleteBlog, readBlogs } from '../../crud/blog'
import { getMessage } from '../../crud/common'

const mapDispatchToProps = (dispatch) => {
  return {
    changeTab: (...args) => (dispatch(changeTab(...args))),
    loadArticles: () => readBlogs()(dispatch),
  }
}

class BlogList extends Component {
  componentWillMount() {
    this.props.changeTab(0)
  }
  onEdit(e, id) {
    e.stopPropagation()
    this.props.history.push('/dashboard/blogs/update/' + id)
  }

  onDelete(e, id) {
    e.stopPropagation()
    deleteBlog(id).then(() => {
      this.props.loadArticles()
    }).catch((err) => {
      let message = getMessage(err)
      alert(message)
    })
  }

  onLike(e, id) {
    e.stopPropagation()
    let article = this.props.articles.find(({ postid }) => postid == id);
    article.like += 1; //doesn't work
  }
  onClickDetails(id) {
    this.props.history.push('/dashboard/blogs/details/' + id)
  }


  render() {
    const { articles } = this.props;
    return (
      <div className="container">
        <Card.Group itemsPerRow={3}>
          {articles.map(atc => (
            <Card key={atc.postid} onClick={() => this.onClickDetails(atc.postid)}>
              <Card.Content>
                <Card.Header >
                  {abbrev(atc.title, 50)}
                </Card.Header>
                <Card.Meta>
                  <span className='date'>
                    {((atc.create_time))}
                  </span>
                </Card.Meta>
                <Card.Description>
                  {abbrev(atc.content, 200)}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div onClick={(e) => this.onLike(e, atc.postid)}>
                  <Icon name='like'
                  />
                  {atc.like} Likes
          </div>
              </Card.Content>
              <Card.Content extra>
                <div className="ui buttons">
                  <button
                    className="ui button positive"
                    onClick={(e) => this.onEdit(e, atc.postid)}>
                    Edit
                  </button>
                  <div className="or"></div>
                  <Popup trigger={
                      <button
                        className="ui button negative"
                        onClick={(e, ) => this.onDelete(e, atc.postid)}>
                        Delete
                      </button>
                    }
                    inverted
                    content="Warning: can't undo delete"
                  />
                </div>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </div>
    )
  }
}

BlogList = connect(null, mapDispatchToProps)(BlogList);
export default withRouter(BlogList);