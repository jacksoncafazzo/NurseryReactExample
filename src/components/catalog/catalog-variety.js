import React, { Component } from 'react';

import { Card, CardHeader, CardTitle, CardText, CardMedia, CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import '../../public/styles/catalog-index.css';

import AddImage from '../add/add-image';

export default class CatalogVariety extends Component {
  constructor(props) {
    super(props);

    this.state = {
      varieties: {},
      genusKey: props.genusKey,
      variety: props.variety,
    }
  }

  renderVariety(variety, varietyName) {
    let renderArray = [];
    let { genusName, varieties, subtitle, refString } = this.props;

    return (<Card key={variety.gpDescs[0]}>
      <CardHeader className='variety-card-header' title={<CardTitle
          title={varietyName}
          />}
          actAsExpander={true}
          subtitle={subtitle}
          subtitleStyle={{fontStyle:'none',fontSize:16}}
          showExpandableButton={true}
          avatar={variety.img}
          />);
          <CardText expandable={true} className='variety-card'>
            {(variety.img) ?
              <CardMedia className='variety-img' overlay={<CardTitle subtitle={variety.scientificName} expandable={true} />} >
                <img src={variety.img} alt={variety.scientificName} />
              </CardMedia> : <CardText>No image</CardText>}
            <ul className='variety-list'>
              <li style={{fontSize:22,fontWeight:'bold',paddingBottom:10}}>{varietyName}</li>
              <li style={{fontStyle:'italic',fontSize:22,paddingBottom:20}}>{variety.scientificName}</li>
              <li>Grows to height: {variety.height}</li>
              <li>Sizes available: </li>
              <ul>
                {variety.sizes.map((size, i) => {
                  return <li key={i}>{variety.gpDescs}<br />{size} - volume: {variety.volumes[i]}</li>
                })}
              </ul>
            </ul>
          </CardText>
          <CardActions expandable={true} className='variety-actions'>
            <CardText>admins can upload or change images! choose image file first then change db entry</CardText>
            <AddImage plant={variety} refString={`${refString}/varieties/${varietyName}`} />
          </CardActions>
    </Card>)
  }

  render() {
    let { styles, sectionName, genusName, varieties, subtitle } = this.props;
    console.log('variety render', varieties);
    if (varieties) {
        return (
          <Card className='variety-card'>
            {Object.keys(varieties).map((key) => {
              return this.renderVariety(varieties[key], key)
            })}
            </Card>
          );
      } else {
      return (<div>loading</div>)
    }
  }
}



// {(variety.img) ? <img style={styles.thumb} src={variety.img} alt={variety.scientificName} /> : null}
