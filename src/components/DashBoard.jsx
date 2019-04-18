import React, { Component } from 'react'
import FriendList from './FriendList'
import { Route, Redirect, withRouter } from 'react-router-dom'
import BlogOrderingList from './blog/BlogOrderingList'
import BlogCreation from './blog/BlogCreation'
import BlogUpdate from './blog/BlogUpdate'
import BlogDetails from './blog/BlogDetails'
import { connect } from 'react-redux'
import { Divider } from 'semantic-ui-react';
import { readBlogs } from '../crud/blog'
import './main.css'
import { getSession, validateSession, clearSession } from './auth/utils'



const mapStateToProps = (state) => {
  return {
    articles: state.blog.articles,
    loading: state.blog.loading,
    tabIx: state.other.tabIx
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadArticles: () => readBlogs()(dispatch),
  }
}


class DashBoard extends Component {
  constructor(props) {
    super(props)
    this.leftTabs = [
      { name: "blogs", icon: "book" },
      { name: "profile", icon: "user" }
    ]
    this.rightTabs = [{ name: "logout", icon: "power off" }]
    this.state = {
      authenticated: undefined
    }
  }

  componentDidMount() {
    let { userId, token } = getSession()
    validateSession(userId, token).then(() => {
      this.setState({ authenticated: true })
      this.props.loadArticles()
    }).catch(() => {
      this.setState({ authenticated: false })
    })
  }


  protected = (component) => {
    return (this.state.authenticated) ? component : <Redirect to='/' />
  }


  componentWillMount() {
  }

  redirect = (ix) => {
    let tab;
    if (ix < this.leftTabs.length) {
      tab = this.leftTabs[ix];
    } else {
      tab = this.rightTabs[ix - this.leftTabs.length]
    }
    switch (tab.name) {
      case 'blogs':
        this.props.history.push('/dashboard/blogs');
        break;
      case 'profile':
        this.props.history.push('/dashboard/profile');
        break;
      case 'logout':
        clearSession()
        this.props.history.replace('/');
        break;
      default:
        alert("incorrect key mapping for tabs")
    }


  }

  render() {
    let { articles, loading } = this.props;

    if (this.state.authenticated === undefined)
      return null
    if (this.state.authenticated === false)
      return <Redirect to='/' />

    return (
      <div className="dashboard">

        <div className="ui top attached labeled icon menu inverted">
          {this.leftTabs.map((elem, ix) => {
            let {name,icon} = elem
            return (
              <a
                className={"item" +
                  ((ix === this.props.tabIx) ? " active" : "")}
                key={ix}
                onClick={() => this.redirect(ix)}
              >
                <i className={icon+" icon"}></i>
                {name}
              </a>
            )
          })}

          <div className="right menu">
            {this.rightTabs.map((elem, ix) => {
              let {name,icon} = elem
              let rix = ix + this.leftTabs.length;
              return (
                <a
                  className={"item" +
                    ((rix == this.props.tabIx) ? " active" : "")}
                  key={ix}
                  onClick={() => this.redirect(rix)}
                >
                  <i className={icon+" icon"}></i>
                  {name}
                </a>
              )
            })}
          </div>
        </div>


        <Route
          exact path="/dashboard"
          render={() => <Redirect to="/dashboard/blogs" />}
        />


        <Route
          exact path="/dashboard/blogs"
          render={(props) => <BlogOrderingList {...props}
            articles={articles} loading={loading} />}
        />

        <Divider hidden />

        <Route
          path="/dashboard/blogs/create"
          render={(props) => <BlogCreation {...props} />}
        />

        <Route
          path="/dashboard/blogs/details/:id"
          render={(props) => <BlogDetails {...props} />}
        />


        <Route
          path="/dashboard/blogs/update/:id"
          render={(props) => <BlogUpdate {...props} />}
        />




        <Route
          path="/dashboard/friends"
          render={(props) => <FriendList {...props} />}
        />


        <img
          id="background"
          src={require('../assets/background.jpg')}
          alt="background"
        />
      </div>


    )
  }
}

DashBoard = connect(mapStateToProps, mapDispatchToProps)(DashBoard)
export default withRouter(DashBoard);