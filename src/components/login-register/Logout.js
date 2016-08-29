import React, { Component, PropTypes } from 'react';
import * as firebase from 'firebase';

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    };
  }

  componentDidMount() {
    firebase.auth().signOut();
    this.setState({ loggedIn: false });
  }

  render() {
    return (
      <p>You are now logged out</p>
    );
  }
}

Logout.contextTypes = {
  router: PropTypes.object.isRequired
}

export default Logout;
