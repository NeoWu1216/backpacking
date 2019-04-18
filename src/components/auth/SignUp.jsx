import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import { Form, Button, Message, Container } from 'semantic-ui-react'
import { getMessage } from '../../crud/common'
import { facebookSignUp } from '../../crud/user'
import { appId, validateSession, getSession, saveSession } from './utils'

class SignUp extends Component {
  constructor(props) {
    super(props)
    let { name, email, avatar} = this.props
    this.state = {
      formState: "",
      name,
      email,
      avatar,
      userId: null,
      message: ""
    }
  }

  componentDidMount() {
    let { userId, token } = getSession();
    validateSession(userId, token).then(() => {
      this.props.history.replace('/dashboard')
    }).catch((err) => {
      if (err.status === 200) {
        this.setState({ userId })
      } else {
        this.props.history.replace('/dashboard')
      }
    })
  }

  redirectAfterSubmit = (timeout) => {
    setTimeout(() => this.props.history.replace('/dashboard'), timeout)
  }

  onInputChange = (e) => {
    this.setState({ [e.target.id]: e.target.value })
  }

  onSubmit = (e) => {
    let { name, email, userId, avatar } = this.state
    this.setState({ formState: 'loading' })
    facebookSignUp({ name, email, user_id:userId, profile_pic:avatar }).then(()=>{
      this.setState({
        formState : 'success',
        message: "Welcome!"
      }, ()=>{this.redirectAfterSubmit(500)})
    }).catch((err) =>{
      console.log(err)
      let message = getMessage(err)
      this.setState({
        formState : 'error',
        message
      })
    })
  }

  render() {
    let { formState } = this.state;
    return (
      <Container>
      <Form
        loading={formState === 'loading'}
        success={formState === 'success'}
        error={formState === 'error'}
        className="container-fluid"
      >
        <Form.Field>
          <label style={{color:'white'}}>Name</label>
          <input
            type='text'
            placeholder='Name'
            value={this.state.name}
            id='name'
            onChange={this.onInputChange}
          />
        </Form.Field>
        <Form.Field>
          <label style={{color:'white'}}>Email</label>
          <input
            type='text'
            placeholder='Email'
            value={this.state.email}
            id='email'
            onChange={this.onInputChange}
          />
        </Form.Field>
        <Message success header='Form Success' content={this.state.message} />
        <Message error header='Form Failure' content={this.state.message} />
        <Button primary type='submit' onClick={this.onSubmit}>Sign Up Now!</Button>
      </Form>
      </Container>
    )
  }
}

export default withRouter(SignUp)