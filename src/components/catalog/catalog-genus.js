import React, { Component } from 'react';
import { Card, CardHeader, CardTitle, CardText, CardMedia, CardActions } from 'material-ui/Card';
// import CatalogGenus2 from './catalog-genus2.js';
import '../../styles/catalog-index.css';
import Toggle from 'material-ui/Toggle';
import CatalogVariety from './catalog-variety';
import AddImage from '../add/add-image';
import RaisedButton from 'material-ui/RaisedButton';
import ImageEdit from 'material-ui/svg-icons/image/edit';

export default class CatalogGenus extends Component {

  //
  // handleExpandChange(expanded) {
  //   this.setState({ expanded: expanded});
  // };
  //
  // handleGenusToggle(event, toggle) {
  //   this.setState({ expanded: toggle });
  // };

  renderColor(colors) {
    let colorsLength = Object.keys(colors).length

    let renderArray = [];
    let firstPart = 'Color'
    if (colorsLength > 1) {
      firstPart += 's';
    }
    Object.keys(colors).map((key, i) => {
      renderArray.push(<CardText key={i}>{`${firstPart}: ${colors[key]}`}</CardText>);
    });

    return renderArray;
  }

  render() {
    let { genus, title } = this.props;
    let { subtitle, Description, key, varieties } = genus;
    let plantKey = key;
    let avatar = Object.keys(varieties).map((key, i) => {
      if (i === 0) {
        return varieties[key].img
      }
    });
    let styles = {
      thumb: {
        width: 80,
        float: 'left',
        paddingTop: 20,
        paddingLeft: 10
      },
      subtitle: {
        color: 'black',
        fontStyle: 'italic'
      },

    }
    return (
      <Card className='genus-card'>
        <CardHeader title={<CardTitle
          title={title}
          subtitle={Description}
          subtitleStyle={styles.subtitle}
          />}
          actAsExpander={true}
          showExpandableButton={true}
          avatar={avatar[0]}
          />
        {Object.keys(varieties).map((key, i) => {
          {(varieties[key].img) ? <img style={styles.thumb} src={varieties[key].img} alt={varieties[key].scientificName} /> : null}
        })}
        <CardText expandable={true}>
        {(varieties) ? Object.keys(varieties).map((key, i) => {
          let variety = varieties[key];
          return (<CatalogVariety variety={variety} varietyName={key} key={i} styles={styles} />)
        }) : <div>varieties loading</div>}
        </CardText>

        </Card>
      );
    }
  }
