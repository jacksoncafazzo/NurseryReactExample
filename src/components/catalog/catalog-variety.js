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
    if (variety) {
      return (
        <Card key={variety.key}
          expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
            <CardHeader title={<CardTitle title={title}
              actAsExpander={true}
              showExpandableButton={true} /> } />
        </Card>
      );
    } else {
      return null
    }
  }
}
