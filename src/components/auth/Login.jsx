import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom'
import FacebookLogin from 'react-facebook-login';
import { appId, validateSession, getSession, saveSession } from './utils'
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
      if (err.status === 200) {
        saveSession(userId, token)
        this.setState({ signUp: true })
      } else {
        onError(err)
      }
    })
  }

  componentDidMount() {
    let { userId, token } = getSession();
    this.updateAuthentication(userId, token, (err) => console.error(err))
  }

  responseFacebook = (response) => {
    if ('error' in response) {
      console.error(response.error)
      console.error(response)
      alert(response.error)
      console.warn(response.error)
      return
    }
    let { userID, accessToken, picture, name, email } = response;
    this.setState({ avatar: picture.data.url, name, email })
    this.updateAuthentication(userID, accessToken, (err) => alert(err))
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
