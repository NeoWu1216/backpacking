import React, { Component } from 'react'
import { Card, Icon, Container, Label} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { abbrev, date_to_str } from '../format'
import { changeTab} from '../../redux/actions'
import { withRouter } from 'react-router-dom'
import { Popup } from 'semantic-ui-react'
import { deleteBlog, readBlogs } from '../../crud/blog'
import { getMessage } from '../../crud/common'
import { likePost, unlikePost } from '../../crud/like'

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

  onDelete(e, id, author) {
    e.stopPropagation()
    deleteBlog(id, author).then(() => {
      this.props.loadArticles()
    }).catch((err) => {
      let message = getMessage(err)
      alert(message)
    })
  }

  onLike(e, atc) {
    e.stopPropagation()
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


  onClickDetails(id) {
    this.props.history.push('/dashboard/blogs/details/' + id)
  }


  render() {
    const { articles, itemsPerRow} = this.props;
    console.log(articles)
    return (
      <Container>
        <Card.Group itemsPerRow={itemsPerRow || 3} stackable>
          {articles.map(atc => (
            <Card key={atc.postid} onClick={() => this.onClickDetails(atc.postid)}>
              <Card.Content>
                <Card.Header >
                  {abbrev(atc.title, 50)}
                </Card.Header>
                {"Author: "+((atc.author_name))}

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
                <div onClick={(e) => this.onLike(e, atc)}>
                  <Icon name='like' color={(atc.like) ? 'red' : 'grey'}
                  />
                  {atc.likenum} Likes
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
                        onClick={(e, ) => this.onDelete(e, atc.postid, atc.author)}>
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
      </Container>
    )
  }
}

BlogList = connect(null, mapDispatchToProps)(BlogList);
export default withRouter(BlogList);