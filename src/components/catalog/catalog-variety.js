import React, { Component } from 'react';

import { Card, CardHeader, CardTitle, CardText, CardMedia, CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import ImageEdit from 'material-ui/svg-icons/image/edit';

import AddImage from '../add/add-image';

export default class CatalogVariety extends Component {

  render() {
    let { variety, styles, varietyName } = this.props;

    return (
      <Card>
        <CardHeader title={<CardTitle
          title={varietyName}
          />}
          actAsExpander={true}
          subtitle={variety.Description}
          showExpandableButton={true}
          avatar={variety.img}
          />

        <CardText expandable={true}>
        {(variety.img) ? <CardMedia overlay={<CardTitle subtitle={variety.scientificName} />} >
        <img src={variety.img} alt={variety.scientificName} />
        </CardMedia> : <CardText>No image</CardText> }
        <ul>
          <li>Height: {variety.height}</li>

          <li>Sizes: </li>
          <ul>
            {variety.sizes.forEach((size) => {
              return <li>{size}</li>
            })}
          </ul>
          <li>Volumes:</li>
          <ul>
            {variety.volumes.forEach((volume) => {
              return <li>{volume}</li>
            })}
          </ul>
        </ul>
      </CardText>
      <CardActions expandable={true}>
        <AddImage plant={variety} varietyName={varietyName}/>
      </CardActions>
      </Card>
    );


  }
}

// {(variety.img) ? <img style={styles.thumb} src={variety.img} alt={variety.scientificName} /> : null}
