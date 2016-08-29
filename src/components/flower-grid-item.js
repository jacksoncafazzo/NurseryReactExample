import React, { Component, PropTypes } from 'react';
import { GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import firebase from 'firebase';
import RaisedButton from 'material-ui/RaisedButton';


class FlowerGrid extends Component {
  constructor(props) {
    super(props);

  }

  handleBuySmall(flower) {
    const user = firebase.auth().currentUser;
    let resultObject = {
      userId: user.uid,
      userEmail: user.email,
    }
    Object.keys(flower).map((key, i) => {
      resultObject[key] = flower[key];
    })
    console.log('result object', resultObject);

    let ref = firebase.database().ref('userFlowers');
    ref.push(flower)
       .then((result, errors) => {
         console.log(errors);

       });
  }

  handleBuyLarge() {

  }

  render() {
    let flower = this.props.flower;
    let key = flower.key;
    console.log('flowergrid', key);
    if (flower !== null) {
      return (
        <div>
        <GridTile
          key={key}
          title={flower.commonName}
          subtitle={<span>Variety: <b>{flower.variety}</b></span>}
          actionIcon={<IconButton><StarBorder color="black" /></IconButton>}
          >
          <img src={flower.img} alt={flower.variety}/>
        </GridTile>
        <RaisedButton label={`buy small pot $${flower.priceSmall}`} onClick={() => {
            this.handleBuySmall(flower)}
        } />
        <RaisedButton label={`buy large pot $${flower.priceLarge}`} onClick={this.handleBuyLarge.bind(this)} />
        </div>

      );
    } else {
      return (<p>Loading...</p>);
    }
  }
}

export default FlowerGrid;


// })
//
// <Card key={variety} className='flower-card'>
//   <CardMedia actAsExpander={true} showExpandableButton={true}
//     overlay={<CardTitle title={commonName} subtitle={variety}  />}
//     >
//     <img src='http://www.freeimageslive.com/galleries/nature/flora/preview/nature01464.jpg' alt={commonName + variety}/>
//   </CardMedia>
//   <CardText expandable={true}>
//     <p>Plant Descriptions: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//   </CardText>
//   <CardActions>
//     <FlatButton label={`Buy Small Pot $${priceSmall}`}>
//
//     </FlatButton>
//     <FlatButton label={`Buy Large Pot $${priceLarge}`} />
//   </CardActions>
// </Card>
