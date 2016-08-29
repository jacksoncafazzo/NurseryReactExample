import React, { Component, PropTypes } from 'react';
import firebase from 'firebase';

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

    let self = Login;
    console.log(self);
    firebase.auth().signInWithEmailAndPassword(e.target.email.value, e.target.pw.value).then((result) => {
      let location = self.props.location;
      if (location.state && location.state.nextPathname) {
        self.context.router.replace(location.state.nextnextPathname);
      } else {
        self.context.router.replace('/addflower');
      }
      // browserHistory.push('/');
      //User Signed In
      console.log('User signed in!');
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    let errors = this.state.error ? <p>{this.state.error}</p> : '';

    return (
      <div className='col-sm-6 col-sm-offset-3'>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label>Email</label>
            <input className='form-control' name='email' value={this.state.email} placeholder='Email'
            onChange={event => this.setState({ email: event.target.value })}
            />
          </div>
          <div className='form-group'>
            <label>Password</label>
            <input name='pw' type='password' className='form-control' placeholder='Password'
            onChange={event => this.setState({ pw: event.target.value })}
          />
          </div>
          {errors}
          <button type='submit' className='btn btn-primary'>Login</button>
        </form>
      </div>
    )
  }
}

export default Login;
