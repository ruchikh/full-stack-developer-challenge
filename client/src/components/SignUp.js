import React, { Component } from 'react'
import { signUpAction } from '../actionCreator/actions';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Signup extends Component {
    state = {
        username: '',
        email: '',
        password: ''
    }

  // ValidateEmail = (email) => 
  // {
  //   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email))
  // {
  //   return (true)
  // }
  //   alert("You have entered an invalid email address!")
  //   return (false)
  // }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.dispatch(signUpAction(this.state))
        this.props.history.push('/login')
    }

  render() {
    return (
      <div className="signup-container">
         <form action="/signup" method="post" onSubmit={this.handleSubmit} className="signup-form">
            <h1>SignUp Form</h1>
            <input type="text" placeholder="Username" required name="username" onChange={this.handleChange} />
            <input type="email" placeholder="Email" required name="email" onChange={this.handleChange} />
            <input type="password" placeholder="Password" required name="password" onChange={this.handleChange} />
            <button type="submit" onSubmit={this.handleSubmit}>submit</button>
            <Link to="/login" className="signup-link">Have Account?</Link>
         </form>
         
      </div>
    )
  }
}

export default connect()(Signup);