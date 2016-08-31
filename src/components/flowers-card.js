import React, { Component } from 'react';
import { Card, CardActions, CardMedia, CardText, CardHeader } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { saveUserFlower } from '../actions/firebase-actions';

class FlowerCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flower: this.props.flower
    }
  }
  handleBuySmall(event) {
    let flower = this.state.flower;
    let resultObject = {
      price: flower.priceSmall
    }
    saveUserFlower(resultObject, flower);
  }

  handleBuyLarge(event) {
    let flower = this.state.flower;
    let resultObject = {
      price: flower.priceLarge
    }
    saveUserFlower(resultObject, flower);
  }

  render() {
    const overlayStyles = {
      color: 'lightgrey',
      textShadow: '1px 1px 1px black'
    };

    const titleStyles = {
      fontSize: .6,
      fontStyle: 'italic'
    }

    let flower = this.props.flower;
    return (
      <Card className='flower-card' >
        <CardHeader
          className='flower-header'
          actAsExpander={true}
          showExpandableButton={true}
          title={flower.commonName}
          titleStyle={{textAlign: 'left'}}
          avatar={flower.img}
          subtitle={flower.variety}
          children={<div style={{ whiteSpace: 'pre-wrap', maxWidth: 300, marginLeft: 'auto', marginRight: 25, alignSelf: 'flex-end' }}>{flower.instructions}</div>}
          />
          <Card className='flower-card-details' expandable={true}>
          <CardMedia>
            <img src={flower.img} alt={flower.commonName} />
          </CardMedia>
          </Card>
        </Card>
    );
  }
}

export default FlowerCard;

// <CardText
//   title='Growing Instructions'/>

// <CardActions>
// <RaisedButton label={`small pot $${flower.priceSmall}`} onClick={this.handleBuySmall.bind(this)}
// value={flower}
// />
// <RaisedButton label={`large pot $${flower.priceLarge}`} onClick={this.handleBuyLarge.bind(this)} value={flower} />
// </CardActions>
