import React, { Component } from 'react';
import firebase from 'firebase';
import CartCard from './shoppingCart-card';
import '../styles/shopping-cart.css';


export default class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userFlowers: null,
      totalPrice: 0
    }
  }

  componentWillMount() {
    let user = firebase.auth().currentUser;
    const userFlowersRef =  firebase.database().ref('/users/' + user.uid);
    let self = this;
    userFlowersRef.on('value', (snapshot) => {
      self.setState({ userFlowers: snapshot.val() });
    });
  }

  // getListings(flowers, uid) {
  //   let userFlowersArray = [];
  //   Object.keys(flowers).map((key, i) => {
  //     userFlowersArray[i] = flowers[key];
  //     userFlowersArray[i].key = key;
  //   });
  //   this.setState({ userFlowers: userFlowersArray });
  // }

  componentWillUpdate() {
    let totalPrice = this.state.totalPrice;
    let flowers = this.state.userFlowers;
    Object.keys(flowers).map((key) => {
      totalPrice += parseFloat(flowers[key].price);
    });
    this.setState({ totalPrice: totalPrice });
}

  render() {
    const flowers = this.state.userFlowers;
    if (flowers !== null) {
      return (
        <div className='shopping-cart'>
          {Object.keys(flowers).map((key, i) => {
            return <CartCard key={'cartCard' + i} flower={flowers[key]}/>
          })}
          <div className='orders-total'>
            <p>Orders total: ${this.state.totalPrice.toFixed(2)}</p>
          </div>
        </div>
      );
    } else {
      return (<p>Click buy to add flowers...</p>);
    }
  }
}
