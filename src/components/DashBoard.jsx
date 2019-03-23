import React, { Component } from 'react'
import FriendList from './FriendList'
import { Route, Redirect, withRouter } from 'react-router-dom'
import BlogList from './blog/BlogList'
import BlogCreation from './blog/BlogCreation'
import BlogUpdate from './blog/BlogUpdate'
import BlogDetails from './blog/BlogDetails'
import { connect } from 'react-redux'
import { Divider } from 'semantic-ui-react'

const mapStateToProps = (state) => {
  return {tabIx : state.tabIx}
}

class DashBoard extends Component {
  constructor(props) {
    super(props)
    this.leftTabs = ["blogs", "friends"]
    this.rightTabs = ["create"]
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
        <div className="ui top attached tabular menu">
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
        <Divider hidden />


        <Route
          exact path="/dashboard"
          render={() => <Redirect to="/dashboard/blogs" />}
        />


        <Route
          exact path="/dashboard/blogs"
          render={(props) => <BlogList {...props} />}
        />
        
        

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
      </div>
    )
  }
}

DashBoard = connect(mapStateToProps, null)(DashBoard)
export default withRouter(DashBoard);