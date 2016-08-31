import React, { Component, PropTypes } from 'react';
import firebase from 'firebase';

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    };
  }

  componentDidMount() {
    firebase.auth().signOut()
      .then(() => {
        this.setState({ loggedIn: false });
        //success
      }, (error) => {
        this.setState({ error: error });
      });
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
