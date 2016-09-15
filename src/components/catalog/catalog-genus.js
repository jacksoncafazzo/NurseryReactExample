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
  constructor(props) {
    super(props);
    let {genus, title, description} = this.props;
    this.state = {
      genusExpanded: false,
      genus: genus,
      title: title,
      description: description,
    }
  }

  handleExpandChange(genusExpanded) {
    this.setState({ genusExpanded: genusExpanded});
  };

  handleGenusToggle(event, toggle) {
    this.setState({ genusExpanded: toggle });
  };

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

  handleEditImage(e) {

  }

  render() {
    let { genus, title, description } = this.props;
    let styles = {
      thumb: {
        width: 80,
        float: 'left',
        paddingTop: 20,
        paddingLeft: 10
      },
      subtitle: {
        color: 'black'
      },

    }
    return (
      <Card key={title}
        expanded={this.state.genusExpanded} onExpandChange={this.handleExpandChange.bind(this)} className='plant-card'>
        {(genus['img']) ? <img style={styles.thumb} src={genus['img']} alt={`${genus['Genus 2']} ${genus['Variety 2']}`} /> : null}
        <CardHeader title={<CardTitle
          title={`${genus['Genus']} ${genus['Variety 2']}`}
          subtitle={`${genus['Genus 2']} ${genus['Variety 2']}`}
          subtitleStyle={styles.subtitle}
            />}
            actAsExpander={true}
            subtitle={description}
            />
          <CardText expandable={true}>{genus['GROWPOINT ITEMDESC']}
            {(genus['img']) ? <CardMedia expandable={true} overlay={<CardTitle title={`${genus['Genus 2']} ${genus['Variety 2']}`} />} >
              <img src={genus['img']} alt={title} />
            </CardMedia> : null }
            <CardActions expandable={true}>
              <AddImage plant={genus} />
            </CardActions>
          </CardText>
        </Card>
      );
    }
  }

//   <CatalogVariety variety={variety} key={i} title={key} expandable={true} />
// }): null}
