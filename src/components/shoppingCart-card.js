import React, { Component } from 'react';
import {Card, CardActions, CardMedia} from 'material-ui/Card';
import '../styles/shopping-cart.css';
import { removeUserFlower } from '../actions/firebase-actions';

class CartCard extends Component {
  handleRemove() {
    let flower = this.props.flower;
    removeUserFlower(flower.key);
  }
  render() {
    const removeStyles = {
      cursor: 'pointer'
    };
    let flower = this.props.flower;
    if (flower !== null) {
      return (
        <Card className='cart-card'>
          <CardMedia
            >
            <img src={flower.img} alt={flower.commonName}/>
          </CardMedia>
          <CardActions>
            <i className='material-icons'
              style={removeStyles} onClick={this.handleRemove.bind(this)}>
              remove_shopping_cart
            </i>
          </CardActions>
        </Card>
      );
    } else {
      return (
        <h2>Click a flower to expand and add to cart</h2>
      );
    }
  }
};

export default CartCard;
