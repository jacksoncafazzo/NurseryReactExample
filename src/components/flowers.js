import React, { Component } from 'react';
import firebase from 'firebase';
import FlowerCard from './flowers-card';
import { RaisedButton } from 'material-ui/RaisedButton';
import ShoppingCart from './shoppingCart';

import '../styles/flowers.css';

const premiumsRef = firebase.database().ref('premiums');

export default class Flowers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      premiums: [],
      userFlowers: [],
      uid: ''
    }
  }

  componentWillMount() {
    let premiumArray = [];
    premiumsRef.on('value', (snapshot, error) => {
      let premiumResult = snapshot.val();
      Object.keys(premiumResult).map((key1, i) => {
        premiumArray[i] = premiumResult[key1];
        premiumArray[i].key = key1;
      });
      //console.log('premium array', premiumArray);
      this.setState({ premiums: premiumArray })
    });
  }

  componentDidMount() {

  }

  render() {
    const styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      },
      gridList: {
        width: 500,
        minHeight: 300,
        overflowY: 'auto',
        marginBottom: 24,
      },
    };

    if (this.state.premiums.length > 0) {
    return (
      <div>
        <ShoppingCart uid={this.state.uid} />
        <div className='flowers'>
        {this.state.premiums.map((flower, i) => {
            //console.log('premium', flower);
            return (
              <FlowerCard flower={flower}
              key={'premium' + flower.key}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return (<p>Loading...</p>);
  }
  }
}
