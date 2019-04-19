import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUser } from '../../crud/user'
import { Grid, Image, Label, Icon, Segment } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import BlogList from '../blog/BlogList'
import { changeTab } from '../../redux/actions'

const mapStateToProps = (state) => {
  return { articles: state.blog.articles }
}

const mapDispatchToProps = (dispatch) => {
  return { changeTab: (...args) => dispatch(changeTab(...args)) }
}

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = { username: '', profile_pic: '', email: '', userid: '' }
  }


  openMail = (src) => () => {
    window.open("mailto:" + src, "_blank")
  }

  openChat = (e) => {
    window.open('http://localhost:8000'+'/chat/privateChat/', '_blank')
  }

  componentDidMount() {
    let userid = this.props.match.params.id
    this.props.changeTab(1)
    getUser(userid).then((data) => {
      let { username, profile_pic, email, userid } = data
      this.setState({ username, profile_pic, email, userid })
    }).catch((err) => {
      alert(err)
      this.props.history.replace('/')
    })
  }


  render() {
    let { username, profile_pic, email, userid } = this.state
    let { articles } = this.props
    let writeArticles = articles.filter((elem) => (elem.author === userid))
    let likedArticles = articles.filter((elem) => (elem.like))
    return (
      <Segment textAlign='center'>
        <Image src={profile_pic} size='small' centered />
        <br />
        <Label as='a' onClick={this.openMail(email)} color='blue'>
          <Icon name='mail' />
          Mail
        </Label>
        <Label as='a' onClick={this.openChat} color='blue'>
          <Icon name='facebook messenger' />
          Messenger
        </Label>
        <Grid columns={2} padded='vertically'>
          <Grid.Column>
            <h3>Blogs of {username}</h3>
            <BlogList articles={writeArticles} itemsPerRow={1}/>
          </Grid.Column>
          <Grid.Column>
            <h3>Blogs liked by {username}</h3>
            <BlogList articles={likedArticles} itemsPerRow={1}/>
          </Grid.Column>
        </Grid>

      </Segment>
    )
  }
}


Profile = connect(mapStateToProps, mapDispatchToProps)(Profile);
export default withRouter(Profile)