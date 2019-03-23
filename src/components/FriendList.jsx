import React, { Component } from 'react'
import { changeTab } from '../redux/actions/index'
import { connect } from 'react-redux'

const mapDispatchToProps = (dispatch) => {
  return {
    changeTab : (...args) => (dispatch(changeTab(...args))),
  }
}

class FriendList extends Component {
  componentWillMount() {
    this.props.changeTab(1)
  }

  render() {
    return (
      <div>
        <ul>
          <li>my friend</li>
          <li>my friend</li>
          <li>my friend</li>
          <li>my friend</li>
        </ul>
      </div>
    )
  }
}

FriendList = connect(null, mapDispatchToProps)(FriendList);
export default FriendList
