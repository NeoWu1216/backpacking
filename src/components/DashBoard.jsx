import React, { Component } from 'react'
import BlogList from './BlogList'
import FriendList from './FriendList'
import { Route, Redirect, withRouter } from 'react-router-dom'

class DashBoard extends Component {
  constructor(props) {
    super(props)
    this.tabs = ["blogs", "friends"]

    this.state = {
      tabIx: 0
    }
  }

  redirect = (ix) => {
    this.setState({ tabIx: ix })
    let tab = this.tabs[ix];
    switch (tab) {
      case 'blogs':
        this.props.history.push('/dashboard/blogs');
        break;
      case 'friends':
        this.props.history.push('/dashboard/friends');
        break;
      default:
        alert("incorrect key mapping for tabs")
    }


  }

  render() {
    return (
      <div className="dashboard">
        <div className="ui top attached tabular menu">
          {this.tabs.map((name, ix) => {
            return (
              <a className={"item" +
                ((ix === this.state.tabIx) ? " active" : "")}
                onClick={()=>{this.redirect(ix)}}>
                {name}
              </a>
            )
          })}

          <div className="right menu">
            <div className="item">
              <div className="ui transparent icon input">
                <input type="text" placeholder="Search users..." />
                <i className="search link icon"></i>
              </div>
            </div>
          </div>
        </div>

        <Route
          exact path="/dashboard"
          render={() => <Redirect to="/dashboard/blogs" />}
        />

        <Route
          path="/dashboard/blogs"
          render={(props) => <BlogList {...props} />}
        />

        <Route
          path="/dashboard/friends"
          render={(props) => <FriendList {...props} />}
        />
      </div>
    )
  }
}

export default withRouter(DashBoard);