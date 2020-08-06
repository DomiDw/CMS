import React, { Component } from 'react'
import axios from 'axios'
import './startpage.scss'

class Login extends Component<any, any> {
  constructor (props:any) {
    super(props)
    this.state = {
      email: '',
      password: '',
      loginErrors: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event:any) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit (event:any) {
    const { email, password } = this.state

    axios
      .post(
        'http://localhost:3001/sessions',
        {
          user: {
            email: email,
            password: password
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        console.log('res from login', response)
      })
      .catch((err:Error) => {
        console.log('login error', err)
      })
    event.preventDefault()
  }

  render () {
    return (
      <>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input
              type='email'
              className='input email'
              placeholder='E-mail'
              value={this.state.email}
              onChange={this.handleChange}
            />
            <input
              type='password'
              className='input password'
              placeholder='Passwort'
              value={this.state.password}
              onChange={this.handleChange}
            />
            <button className='button login'>
              Login
            </button>
          </form>
        </div>
      </>
    )
  }
}

export default Login
