import React, { Component, PropTypes } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router';
import Navigation from './components/navigation';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import BaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import { getUser, saveUserState} from './actions/firebase-actions';

import logo from './logo.svg';
import './App.css';
const config = {
    apiKey: 'AIzaSyC4eK9IJw3y2WLzTORnAriED6zj5Byjyg0',
    authDomain: 'task-example-6e4bc.firebaseapp.com',
    databaseURL: 'https://task-example-6e4bc.firebaseio.com',
    storageBucket: 'task-example-6e4bc.appspot.com',
};

firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: (null !== firebase.auth().currentUser),
      user: {},
      error: ''
    }
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(BaseTheme) };
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(firebaseUser => {
      this.setState({
        loggedIn: (null !== firebaseUser),
        user: firebaseUser
      });

      if (firebaseUser) {
        console.log('Logged In', firebaseUser);
        firebase.database.ref(`users/${firebaseUser.uid}`)
          .set({ user: firebaseUser })
          .catch((error) => {
          this.setState({ error: error });
          saveUserState(this.state, firebaseUser);
        });
      } else {
        console.log('Not logged in dude');
        saveUserState(this.state);
      }
    });
  }

  componentWillUnmount() {
    saveUserState(this.state);
  }

  render() {
    return (
      <MuiThemeProvider>
      <div className="App">
        <Navigation loggedIn={this.state.loggedIn}
          user={this.state.user}/>
          {this.props.children}
      </div>
    </MuiThemeProvider>
    );
  }
}

App.childContextTypes = {
  muiTheme: PropTypes.object.isRequired
}

export default App;
