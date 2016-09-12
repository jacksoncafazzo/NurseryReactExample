import React, { Component, PropTypes } from 'react';
import firebase from 'firebase';
import { browserHistory } from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Register extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      companyName: '',
      error: false,
      email: '',
      pw: '',
      phone: ''
    };
  }

  registerSubmit(e) {
    e.preventDefault();
    let email = e.target.email.value;
    let pw = e.target.pw.value;
    let companyName = e.target.companyName.value;
    let phone = e.target.phone.value;
    let self = this;
    //Add signup event
    firebase.auth().createUserWithEmailAndPassword(email, pw)
    .then((user) => {
      user.updateProfile({
        displayName: companyName,
        photoURL: phone
      }).then(() => {
        console.log('Update Success!');
      }, (error) => {
        console.log('Error!', error);
      });
      browserHistory.push('/users/' + user.uid);
   })
   .catch( self.setState({ error: e.message }) )
}

  updateState(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  clearInput() {
    this.setState({ companyName: '', email: '', pw: '', phone: 'phone'});
  }

  render() {
    let errors = this.state.error ? <p> {this.state.error} </p> : '';
    return (
    <div className='register-form'>
        <h1> Register </h1>
        <form onSubmit={this.registerSubmit.bind(this)}>
          <div>
            <TextField
              name='companyName' floatingLabelText='Company Name (login name)'
              value={this.state.companyName}
              onChange={this.updateState.bind(this)}></TextField>
          </div>
          <div>
            <TextField
              name='phone' floatingLabelText='Contact Phone Number'
              value={this.state.phone}
              onChange={this.updateState.bind(this)}></TextField>
          </div>
          <div>
            <TextField
              name='email' floatingLabelText='Email'
              value={this.state.email}
              onChange={this.updateState.bind(this)}></TextField>
          </div>
          <div>
            <TextField name='pw' type='password' floatingLabelText='Password' value={this.state.pw} onChange={this.updateState.bind(this)}></TextField>
          </div>
          {errors}
          <RaisedButton type='submit' label='Register' />
          <RaisedButton onClick={this.clearInput}  label='CLEAR' />
        </form>
      </div>
    );
  }
}

export default Register;
