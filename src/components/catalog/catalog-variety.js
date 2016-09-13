import React, { Component } from 'react';
import { Card, CardHeader, CardTitle, CardText, CardMedia } from 'material-ui/Card';


export default class CatalogVariety extends Component {

  render() {
    let { variety } = this.props;
    console.log('variety render', variety);
    // let varietiesArray = [];
    // Object.keys(genus).map((key, i) => {
    //   if (genus[key].hasOwnProperty('name')) {
    //     varietiesArray.push(<CatalogVariety key={key} common={genus[key]} />)
    //   }
    // });
    return (
      <Card key={variety.key} >
        <CardHeader title={<CardTitle title={title}
          /> } />
        <CardText>{variety['GROWPOINT ITEMDESC']}</CardText>
      </Card>
    );


  }
}
