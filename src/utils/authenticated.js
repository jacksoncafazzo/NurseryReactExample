// import React, { Component } from 'react';
import firebase from 'firebase';

function requireAuth(nextState, replace) {
  if(null === firebase.auth().currentUser) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}

module.exports = requireAuth;
