import React, { Component } from 'react';
import firebase from 'firebase';

export default class Flowers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flowers: []
    }
  }

  componentWillMount() {
    let flowers = [];
    const ref = firebase.database().ref();
    ref.once('value')
      .then((snapshot) => {
        let flowersResult = snapshot.val();
        Object.keys(flowersResult).map((key1, i) => {
          Object.keys(flowersResult[key1]).map((key2, i) => {
            console.log('flowersResult', flowersResult[key1][key2]);
            flowers.push(flowersResult[key1][key2]);
          });
        });
        console.log('flowers', flowers);
        this.setState({ flowers: flowers });
      });
  }

  render() {
    return (
      <div>
        <h4>
          {this.state.flowers.map((flower, i) => {
            return <div key={flower.variety + i}>Variety: {flower.variety} Common Name: {flower.commonName}, Sm: {flower.priceSmall}, Lg: {flower.priceLarge}</div>
          })}
        </h4>
      </div>
    );
  }
}
