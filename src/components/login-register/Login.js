import React, { Component, PropTypes } from 'react';
import firebase from 'firebase';
import { browserHistory } from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Login extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      error: false,
      email: '',
      pw: ''
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(e.target.email.value, e.target.pw.value).then((result) => {
      //User Signed In
      browserHistory.push('/');
      console.log('User signed in!');
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    let errors = this.state.error ? <p>{this.state.error}</p> : '';

    return (
      <div className='login-form'>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <TextField name='email' value={this.state.email} floatingLabelText='Email'
            onChange={event => this.setState({ email: event.target.value })}
            />
          </div>
          <TextField name='pw' type='password'  floatingLabelText='Password'
            onChange={event => this.setState({ pw: event.target.value })}
          />
          {errors}
          <RaisedButton type='submit' label='Login'></RaisedButton>
        </form>
      </div>
    )
  }
}

export default Login;
