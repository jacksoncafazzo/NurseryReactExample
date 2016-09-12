import React, { Component } from 'react';
import firebase from 'firebase';
import FlowerCard from './flower-card';
import { Card, CardHeader } from 'material-ui/Card';
//import { RaisedButton } from 'material-ui/RaisedButton';
//import ShoppingCart from './shoppingCart';

import '../styles/flowers.css';

export default class Flowers extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  componentWillMount() {
    firebase.database().ref().on('value', (snapshot, error) => {
      let premiumResult = snapshot.val();
      Object.keys(premiumResult).map((key1, i) => {
        premiumArray[i] = premiumResult[key1];
        premiumArray[i].key = key1;
      });
      //console.log('premium array', premiumArray);
      this.setState({ premiums: premiumArray })
    });
  }

  componentWillUnmount() {
    firebase.database().ref().off('value');
  }

  render() {
    const sectionTitleStyles = {
      fontSize: 25,
      fontStyle: 'italic',
      marginRight: 'auto'
    }

    if (this.state.premiums.length > 0) {
    return (
      <div>
        <Card className='premiums'>
          <CardHeader
            title='Premiums'
            titleStyle={sectionTitleStyles}
            children={this.state.premiums.map((flower, i) => {
            return (
              <FlowerCard
                className='flower-card' flower={flower}
              key={'premium' + flower.key}
              />
            );
          })} />
        </Card>
      </div>
    );
  } else {
    return (<p>Loading...</p>);
  }
  }
}

// <ShoppingCart uid={this.props.user} />
