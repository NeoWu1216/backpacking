import React, { Component } from 'react'
import FriendList from './FriendList'
import { Route, Redirect, withRouter } from 'react-router-dom'
import BlogOrderingList from './blog/BlogOrderingList'
import BlogCreation from './blog/BlogCreation'
import BlogUpdate from './blog/BlogUpdate'
import BlogDetails from './blog/BlogDetails'
import { connect } from 'react-redux'
import { Divider } from 'semantic-ui-react';
import {readBlogs} from '../crud/blog'
import './main.css'

const mapStateToProps = (state) => {
  return {tabIx : state.tabIx}
}
const mapDispatchToProps = (dispatch) => {
  return {
    loadArticles : () => readBlogs()(dispatch),
  }
}

class DashBoard extends Component {
  constructor(props) {
    super(props)
    this.leftTabs = ["blogs", "friends"]
    this.rightTabs = ["create"]
  }

  componentWillMount() {
    this.props.loadArticles()
  }

  redirect = (ix) => {
    let tab;
    if (ix < this.leftTabs.length) {
      tab = this.leftTabs[ix];
    } else {
      tab = this.rightTabs[ix-this.leftTabs.length]
    }
    switch (tab) {
      case 'blogs':
        this.props.history.push('/dashboard/blogs');
        break;
      case 'friends':
        this.props.history.push('/dashboard/friends');
        break;
      case 'create':
        this.props.history.push('/dashboard/blogs/create');
        break;
      default:
        alert("incorrect key mapping for tabs")
    }


  }

  render() {
    return (
      <div className="dashboard">
        
        <div className="ui top attached tabular menu inverted">
          {this.leftTabs.map((name, ix) => {
            return (
              <a 
                className={"item" +
                ((ix === this.props.tabIx) ? " active" : "")}
                key = {ix}
                onClick={()=>this.redirect(ix)}
                >
                {name}
              </a>
            )
          })}

          <div className="right menu">
          {this.rightTabs.map((name, ix) => {
            let rix = ix+this.leftTabs.length;
            return (
              <a 
                className={"item" +
                ((rix == this.props.tabIx) ? " active" : "")}
                key = {ix}
                onClick={()=>this.redirect(rix)}
                >
                {name}
              </a>
            )})}
          </div>
        </div>


        <Route
          exact path="/dashboard"
          render={() => <Redirect to="/dashboard/blogs" />}
        />


        <Route
          exact path="/dashboard/blogs"
          render={(props) => <BlogOrderingList {...props} />}
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