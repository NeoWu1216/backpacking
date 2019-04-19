import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom'
import FacebookLogin from 'react-facebook-login';
import { appId, validateSession, getSession, saveSession } from './utils'
import { getMessage } from '../../crud/common'
import SignUp from './SignUp'



class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      authenticated: false,
      signUp: false,
      name: "",
      email: "",
      avatar: "https://react.semantic-ui.com/images/wireframe/image.png"
    }
  }

  updateAuthentication = (userId, token, onError) => {
    validateSession(userId, token).then(() => {
      saveSession(userId, token)
      this.setState({ authenticated: true })
    }).catch((err) => {
      if (err.data === null) {
        saveSession(userId, token)
        this.setState({ signUp: true })
      } else {
        onError(err)
      }
    })
  }

  componentDidMount() {
    let { userId, token } = getSession();
    this.updateAuthentication(userId, token, (err) => console.error(getMessage(err)))
  }

  responseFacebook = (response) => {
    if ('error' in response) {
      alert(response.error)
      return
    }

    let { userID, accessToken, picture, name, email } = response;
    this.setState({ avatar: picture.data.url, name, email })
    this.updateAuthentication(userID, accessToken, (err) => console.log('what',(err)))
  }


  render() {
    let { name, email, avatar } = this.state
    if (this.state.signUp)
      return <SignUp name={name} email={email} avatar={avatar} />
    if (this.state.authenticated)
      return <Redirect to='/dashboard' />
    return (
      <div className="Login">
        <FacebookLogin
          appId={appId}
          fields="name,email,picture"
          callback={this.responseFacebook}
        />
      </div>
    );
  }
}

export default withRouter(Login);
