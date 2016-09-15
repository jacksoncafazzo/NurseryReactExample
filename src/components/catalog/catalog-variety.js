import React, { Component } from 'react';
import { Card, CardHeader, CardTitle, CardText } from 'material-ui/Card';


export default class CatalogVariety extends Component {

  render() {
    let { variety, title } = this.props;
    console.log('variety render', variety);
    // let varietiesArray = [];
    // Object.keys(genus).map((key, i) => {
    //   if (genus[key].hasOwnProperty('name')) {
    //     varietiesArray.push(<CatalogVariety key={key} common={genus[key]} />)
    //   }
    // });
    return (
      <div>
        ima variety
      </div>
    );


  }
}
