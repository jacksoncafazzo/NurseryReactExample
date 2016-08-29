import React, { Component, PropTypes } from 'react';
import * as firebase from 'firebase';
import { browserHistory } from 'react-router';

class Register extends Component {
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

  registerSubmit(e) {
    e.preventDefault();
    let email = e.target.email.value;
    let pw = e.target.pw.value;
    let self = this;
    // Add signup event
    firebase.auth().createUserWithEmailAndPassword( email, pw)
       .then( browserHistory.push('/addflower') )
       .catch( self.setState({ error: e.message }) );
  }

  updateState(e) {
    let inputName = e.target.name;
    if (inputName === 'pw') {
      this.setState({ pw: e.target.value });
    } else if (inputName === 'email') {
      this.setState({ email: e.target.value});
    }
  }

  clearInput() {
    this.setState({ email: '', pw: ''});
  }

  render() {
    let errors = this.state.error ? <p> {this.state.error} </p> : '';
    return (
    <div className='col-sm-6 col-sm-offset-3'>
        <h1> Register </h1>
        <form onSubmit={this.registerSubmit.bind(this)}>
          <div className='form-group'>
            <label> Email </label>
            <input className='form-control'
              name='email' placeholder='Email'
              value={this.state.email}
              onChange={this.updateState.bind(this)}></input>
          </div>
          <div className='form-group'>
            <label>Password</label>
            <input name='pw' type='password' className='form-control' placeholder='Password' value={this.state.pw} onChange={this.updateState.bind(this)}></input>
          </div>
          {errors}
          <button type='submit' className='btn btn-primary'>Register</button>
        </form>
        <button onClick={this.clearInput}>CLEAR</button>
      </div>
    );
  }
}

export default Register;
