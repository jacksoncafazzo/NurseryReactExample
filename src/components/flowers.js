import React, { Component } from 'react';
import firebase from 'firebase';
import FlowerGridItem from './flower-grid-item';
import { GridList } from 'material-ui/GridList';
import { RaisedButton } from 'material-ui/RaisedButton';
import ShoppingCart from './shoppingCart';

import '../styles/flowers.css';

const premiumsRef = firebase.database().ref('premiums');
const userFlowersRef = firebase.database().ref('userFlowers');

export default class Flowers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      premiums: [],
      userFlowers: []
    }
  }

  componentWillMount() {
    let premiumArray = [];
    premiumsRef.once('value')
      .then((snapshot) => {
        let premiumResult = snapshot.val();
        Object.keys(premiumResult).map((key1, i) => {
          premiumArray[i] = premiumResult[key1];
          premiumArray[i].key = key1;
        });
          // premiumArray = Object.keys(premiumResult[key1]).map((key2, j) => {
          //   premiumArray = { [key2]: {}};
          //   premiumArray[key2] = premiumResult[key1][key2];
          //    premiumArray[key2].key = key2;
          //    return premiumArray;
          //  });
        console.log('premium array', premiumArray);
        this.setState({ premiums: premiumArray });
      });
    let user = firebase.auth().currentUser;
    if (user !== null) {
      let uid = user.uid;
      console.log('uid', uid);

    }
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
    const premiums = this.state.premiums;
    //const yourFlowers = this.state.yourFlowers;

    // let premiumKeys = [];
    if (premiums.length > 0) {
    //   Object.keys(premiums)
    //     .map((key, i) => {
    //       premiumKeys[i] = key;
    //     });
    return (
      <div className='add-flowers'>
        <div className='flower-grid'>
          <GridList
            cellHeight={500}
            style={styles.gridList}
            title='flowers'
            >
            {premiums.map((flower, i) => {
              console.log('premium', flower);
              return (
                <div key={'premium' + flower.key}>
                  <FlowerGridItem flower={flower}/>
                </div>
              );
            })}
          </GridList>
        </div>
      </div>
    );
  } else {
    return (<p>Loading...</p>);
  }
  }
}

// <div className='shopping-cart'>
//   <ShoppingCart loggedIn={this.state.loggedIn}
//     yourFlowers={this.state.yourFlowers} />
// </div>
