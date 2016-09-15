import React, { Component } from 'react';
import Radium from 'radium';
import { Card, CardTitle, CardHeader, CardText } from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';
//import { plantsBySection } from '../utils/catalog';
import '../../styles/catalog-index.css';
import {colors} from 'material-ui/styles';
import firebase from 'firebase';
import CatalogGenus from './catalog-genus';
import CatalogSearch from './catalog-search';
import Brachy from '../../imgs/BrachycomeRadiantMagenta.jpg';

export default class CatalogSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plant: this.props.plant,
      expanded: false,
      title: this.props.title,
      genusRenderArray: [],
      genuses: [],
      genusKeys: [],
      styles: {}
    }
  }

  handleExpandChange(expanded) {
    this.setState({ expanded: expanded});
    //this.setState({ genuses: genuses });
  }

  handleToggle(event, toggle) {
    this.setState({ expanded: toggle });
  }

  render() {
    let { expanded, styles } = this.state;
    let { plant, title } = this.props;
    return (
      <Card key={title} expanded={this.state.expanded} onExpandChange={this.handleExpandChange.bind(this)} className='section-card'>
        <CardHeader title={<CardTitle title={title}
          />}
          actAsExpander={true}
          avatar={Brachy}
          children={<Toggle
            toggled={this.state.expanded}
            onToggle={this.handleToggle.bind(this)}
            />}
            />
          {Object.keys(plant).map((key, i) => {
            return <CatalogGenus expandable={true} genus={plant[key]} key={i} title={plant[key]['Genus']}
            subtitle={`${plant[key]['Genus 2']} ${plant[key]['Variety 2']}`}
            description={plant[key]['Description']} />
          })}
      </Card>
    );
  }
}
