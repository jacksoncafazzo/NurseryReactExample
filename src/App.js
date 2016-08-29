import React, { Component, PropTypes } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router';
import Navigation from './components/navigation';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import BaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

import logo from './logo.svg';
import './App.css';
const config = {
    apiKey: 'AIzaSyC4eK9IJw3y2WLzTORnAriED6zj5Byjyg0',
    authDomain: 'task-example-6e4bc.firebaseapp.com',
    databaseURL: 'https://task-example-6e4bc.firebaseio.com',
    storageBucket: 'task-example-6e4bc.appspot.com',
};

firebase.initializeApp(config);

const AppbarStyles = () => getMuiTheme(BaseTheme, {
  palette: {
    primary1Color: '#f4511e'
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: (null !== firebase.auth().currentUser)
    }
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(firebaseUser => {
      this.setState({
        loggedIn: (null !== firebaseUser)
      });

      if (firebaseUser) {
        console.log('Logged In', firebaseUser);
      } else {
        console.log('Not logged in dude');
      }
    });
  }

  render() {
    return (
      <div className="App">
        <MuiThemeProvider muiTheme={AppbarStyles()}>
        <Navigation />
        </MuiThemeProvider>
        {this.props.children}
      </div>
    );
  }
}

export default App;
