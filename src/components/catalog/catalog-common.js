import React, { Component } from 'react';
import { Card, CardHeader, CardTitle, CardText, CardMedia } from 'material-ui/Card';
import CatalogVariety from './catalog-variety';

export default class CatalogCommon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: true
    }
  }

  render() {
    let { common } = this.props;
    let varietiesArray = [];
    console.log('common props', common)
    Object.keys(common).map((key, i) => {
      if (common[key].hasOwnProperty('name')) {
        (key !== 'name') ? varietiesArray.push(<CatalogVariety key={key} variety={common[key]} />) : null;
      }
    });
    return (
      <Card key={common.key}>
        <CardHeader title={common.name} subtitle={(!common.img) ? null : <CardMedia><img src={common.img} alt={common.name} /></CardMedia>} />
        {varietiesArray}
      </Card>
    );
  }
}
