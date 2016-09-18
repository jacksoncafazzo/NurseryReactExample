import React, { Component } from 'react';
import Radium from 'radium';
import firebase from 'firebase';

import { Card, CardTitle, CardHeader, CardText } from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';
import {colors} from 'material-ui/styles';
import CatalogGenus from './catalog-genus';
import CatalogSearch from './catalog-search';

import Brachy from '../../imgs/BrachycomeRadiantMagenta.jpg';

import '../../styles/catalog-index.css';

const ref = firebase.database().ref('catalog');

export default class CatalogSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sectionExpanded: false,
      genusRenderArray: [],
      genuses: {},
      genusNames: [],
      varietyNames: [],
      styles: {}
    }
  }

  componentWillMount() {
    let {title} = this.props;
    ref.orderByChild('PRODUCT GROUP').startAt(title).endAt(title).on('value', (snapshot) => {
      let {genuses, varietyNames} = this.state;
      let plantsBySection = snapshot.val();
      if (!plantsBySection) {
        console.log('database doesnt have that product group');
      } else {
        let sectionName = title;
        let genusNames = Object.keys(genuses);
        let plant = {};
        Object.keys(plantsBySection).map((key, i) => {
          plant = plantsBySection[key];
          let plantGenusName = plant['Genus'].trim();
          let plantVarietyName = plant['Variety'].trim();

          //check for baseGenus
          let wasBaseGenus = false;
          if (plantVarietyName === null) {
            plantVarietyName = plant['Variety 2'].trim();
            wasBaseGenus = true;
          }

          // see if it is in this component's object
          let isInGenus = genusNames.includes(plantGenusName);
          if (!isInGenus) {
            //let's add it
            genusNames.push(plantGenusName);
            genuses[plantGenusName] = {
              varieties: {},
              key: key,
              Description: plant['Description'],
              subtitle: `${plant['Genus 2'].trim()} ${plantVarietyName}`
            };

            //add variety name to list
            varietyNames.push(plantVarietyName);

            if (wasBaseGenus) {
              //make the base genus a variety and set the genus description
              genuses[plantGenusName][subtitle] = `${plant['Genus 2'].trim()} ${plantVarietyName}`;
              genuses[plantGenusName]['Description'] = plant['Description'];
            }

            // either way, add this plant to it's a variety name on the genus
            // this genus tested empty, so we will make a new variety for this plant too.
            genuses[plantGenusName]['varieties'][plantVarietyName] = {
              //add scientificName
              scientificName: `${plant['Genus 2'].trim()} ${plantVarietyName}`,
              Description: plant['Description'],
              img: plant['img'],
              height: plant['Height'],
              volumes: [plant['Volume US (Metric)']],
              sizes: [plant['Pot Category']],
              gpDescs: [plant['GROWPOINT ITEMDESC']]
            };
          } else {
            // genuses has genus, let's do the variety

            //check for baseGenus
            if (wasBaseGenus) {
              genuses[plantGenusName]['Description'] = plant['Description'];
              genuses[plantGenusName]['subtitle'] = `${plant['Genus 2'].trim()} ${plantVarietyName}`;
              genuses[plantGenusName].key = key
            }

            //see if genuses has variety
            let isInVariety = varietyNames.includes(plantVarietyName);

            if (!isInVariety) {
              //push variety name to list
              varietyNames.push(plantVarietyName);

              //if it was not a base genus, and there is no genus description. set the description
              if (!wasBaseGenus && !genuses[plantGenusName].hasOwnProperty('Description')) {
                genuses[plantGenusName]['Description'] = plant['Description'];
                genuses[plantGenusName]['subtitle'] = `${plant['Genus 2'].trim()} ${plantVarietyName}`;
                genuses[plantGenusName].key = key;
              }

              //add variety scientificName and info
              genuses[plantGenusName]['varieties'][plantVarietyName] = {
                scientificName: `${plant['Genus 2'].trim()} ${plantVarietyName}`,
                Description: plant['Description'],
                img: plant['img'],
                height: plant['Height'],
                sizes: [plant['Pot Category']],
                volumes: [plant['Volume US (Metric)']],
                gpDescs: [plant['GROWPOINT ITEMDESC']]
              };
            }
            if (isInVariety) {
              //is the plant is a variety and has genus description already been set?
              if (!wasBaseGenus && !genuses[plantGenusName].hasOwnProperty('Description')) {
                genuses[plantGenusName]['Description'] = plant['Description'];
                genuses[plantGenusName].key = key;
              }
              if (!genuses[plantGenusName].hasOwnProperty('subtitle')) {
                genuses[plantGenusName]['scientificName'] = `${plant['Genus 2'].trim()} ${plantVarietyName}`;
              }

              //pull out the variety to modify it
              let existingVariety = genuses[plantGenusName]['varieties'][plantVarietyName];

              //add variety height, volume, size and gpDesc
              if (existingVariety) {
                existingVariety.volumes.push(plant['Volume US (Metric)']);
                existingVariety.sizes.push(plant['Pot Category']);
                existingVariety.gpDescs.push(plant['GROWPOINT ITEMDESC']);

                //save it back in the genuses collection
                genuses[plantGenusName]['varieties'][plantVarietyName] = existingVariety;
              }
            }
          }
        });

        //forEach loop ending, save genuses and varietyNames so next query will dig it

        this.setState({ genuses, varietyNames });
      }
    });
  }
  // all queries finished

  componentWillUnmount() {
    this.setState({ sectionExpanded: false });
    ref.off();
  }

  handleExpandChange(expanded) {
    this.setState({ sectionExpanded: expanded});
  }

  handleToggle(event, toggle) {
    this.setState({ sectionExpanded: toggle });
  }


  // send the genuses to catalog genus with genusName, genusDescription and scientificName
  render() {
    let { genuses } = this.state;
    let { title } = this.props;
    if (Object.keys(genuses).length < 0) {
      return (<div>loading</div>)
    } else {
      return (
        <Card key={title} className='section-card' expanded={this.state.sectionExpanded} onExpandChange={this.handleExpandChange.bind(this)}>
          <CardHeader title={<CardTitle title={title}
            children={
              <Toggle
                toggled={this.state.sectionExpanded}
                onToggle={this.handleToggle.bind(this)}
                labelPosition='right'
                label='Click here to load section'
                />
            } />}
            avatar={Brachy} />
          {Object.keys(genuses).map((key, i) => {
            return <CatalogGenus expandable={true} genus={genuses[key]} key={genuses[key].key} title={key}
            subtitle={genuses[key].subtitle} description={genuses[key]['Description']} />
          })}
        </Card>
      );
    }
  }
}
