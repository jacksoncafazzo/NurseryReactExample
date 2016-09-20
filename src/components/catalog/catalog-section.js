import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { consumeGenus } from '../actions/index';
import firebase from 'firebase';

import { Card, CardTitle, CardHeader, CardText } from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';
import {colors} from 'material-ui/styles';
import CatalogGenus from './catalog-genus';
import CatalogSearch from './catalog-search';

import PeoriaIcon from '../../imgs/peoria-icon.png';

import '../../styles/catalog-index.css';

const plantsRef = firebase.database().ref('plants/sections');
const catalogRef = firebase.database().ref('catalog');

const styles = {
  title: {
    fontFamily: [
      'Vollkorn',
      'serif'
    ]
  },
}

class CatalogSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sectionExpanded: false,
      sectionName: this.props.title,
      genusRenderArray: [],
      section: this.props.section,
      genusNames: [],
      varietyNames: [],
      loaded: 'Load Section'
    }
  }

  componentWillMount() {
    let { title, section } = this.props;
    let genusNames = Object.keys(section.genera);
    if (section.initialSnap) {
      //we need to set the genusus state
      section.genera = {
        initialSnap: true
      }
      //console.log('u want to get genus names', title, section);

      //go to catalogRef
      catalogRef.orderByChild('PRODUCT GROUP').startAt(title).endAt(title).once('value').then((snapshot) => {
        let sectionSnap = snapshot.val();

        let genusNames = [];
        if (sectionSnap) {
        Object.keys(sectionSnap).map((key, i) => {
          let plant = sectionSnap[key];

          let plantGenusName = plant['Genus'].trim();

          if (!plantGenusName) {
            console.log('DOOOOD the genus is blank', plant);
          }

          let PVN = this.makeVarietyNameCool(plant, title);

          let subtitle = plant['Species 2'].trim();
          if (!subtitle || PVN.isBaseGenus) {
            subtitle = PVN.varietyName + ' ' + plantGenusName;
          } else {
            subtitle = PVN.varietyName + ' ' + subtitle;
          }


          //we start from scratch then it builds
          let isInPlants = genusNames.includes(plantGenusName);

          key = key.replace(/.#$\/[]/, ' ');

          if (!isInPlants) {
            //well now lets just add it
            genusNames.push(plantGenusName);
            section.genera[plantGenusName] = {
              initialSnap: true,
              Description: plant['Description'],
              subtitle: subtitle,
              img: plant['img'] = '',
              refString: `plants/sections/${title}/genera/${plantGenusName}`,
              varieties: { initialSnap: true },
              genusKey: key
            }
            // if (!PVN.isBaseGenus) {
            //   section.genera[plantGenusName].varieties[key] = {
            //     varietyName: PVN.varietyName,
            //     scientificName: subtitle,
            //     height: plant['Height'],
            //     sizes: [plant['Pot Category']],
            //     gpDescs: [plant['GROWPOINT ITEMDESC']],
            //     volumes: [plant['Volume US (Metric)']],
            //     Description: plant['Description'],
            //     img: plant['img'] = '',
            //     refString: PVN.refString
            //   };
            // }
          } else {
            // //plants already has it, modify the values
            // let thisGenus = section.genera[plantGenusName];
            // // pull out the variety
            // let thisVariety = thisGenus.varieties[key] = {
            //   varietyName: PVN.varietyName,
            //   sizes: [],
            //   volumes: [],
            //   gpDescs: []
            // };
            // //change the values
            // thisVariety.Description = plant.Description;
            // thisVariety.img = plant['img'] = '';
            // thisVariety.scientificName = subtitle;
            // thisVariety.sizes.push(plant['Pot Category']);
            // thisVariety.volumes.push(plant['Volume US (Metric)']);
            // thisVariety.gpDescs.push(plant['GROWPOINT ITEMDESC']);
            // //save it back to the genus
            // thisGenus.varieties[key] = thisVariety;
            // //save the genus back to the sections
            // section.genera[plantGenusName] = thisGenus;

            section.initialSnap = false;
            //lets save the updated plants to the db
            plantsRef.child(title).set(section);

          }
          //if in plants ends
        });
        // looping of init snap ends

        //this.setState({section});
        console.log('section is now', section);

        section.initialSnap = false;
        //save it to firebase!
        plantsRef.child(title).set(section);

      } else {
        console.log('snap was null');
      }
      });
      //query loop ends
    } else {
      //section is real deal, not initial snap.
      console.log('section means business', section);
      this.setState({section});
    
      //console.log('u got more kids', section);
    }
  }

  componentWillUnmount() {
    this.setState({ sectionExpanded: false });
  }

  makeRefString(refString, varietyName) {
    varietyName = varietyName.replace(/[.$#\/\[\]]/g, '-').trim();
    return refString + '/' + varietyName;
  }

  makeVarietyNameCool(variety, title) {
    let varietyName = variety['Variety'].trim();
    let plantGenusName = variety['Genus'].trim();
    let refString = `plants/sections/${title}/genera/${plantGenusName}/varieties`;
    let isBaseGenus = false;
    if (!varietyName) {
      varietyName = variety['Variety 2'];

      if (!varietyName) {
        isBaseGenus = true;
        console.log('ur variety is weird', varietyName, refString, variety);
        varietyName = title;
      }
    }

    varietyName = varietyName.replace(/[.#$\/]/, '-');
    refString = this.makeRefString(refString, varietyName);
    return {varietyName, refString, isBaseGenus};
  }

  handleExpandChange(expanded) {
    this.setState({ sectionExpanded: expanded});
  }

  handleToggle(event, toggle) {
    let loaded = '';
    if (toggle === true) {
      loaded = 'Plants below expand'
    } else {
      loaded = 'Load section'
    }
    this.setState({ sectionExpanded: toggle, loaded });
  }

  // send the genuses to catalog genus with genusName, genusDescription and scientificName
  render() {
    let { title } = this.props;
    let {section} = this.state;
    if (!section) {
      return (<div>loading</div>)
    } else {
      return (
        <Card key={title} className='section-card' expanded={this.state.sectionExpanded} onExpandChange={this.handleExpandChange.bind(this)}>
          <CardHeader title={<CardTitle title={title} titleStyle={styles.title}
            children={
              <Toggle
                toggled={this.state.sectionExpanded}
                onToggle={this.handleToggle.bind(this)}
                labelPosition='right'
                label={this.state.loaded}
                labelStyle={styles.title}
                />
            } />}
            avatar={PeoriaIcon} />
          {Object.keys(section.genera).map((key, i) => {
            if (key !== 'initialSnap') {
              return <CatalogGenus expandable={true} genus={section.genera[key]} key={key} title={key} sectionName={title} makeVarietyNameCool={this.makeVarietyNameCool}
              />
            }
          })}
        </Card>
      );
    }
  }
}

export default Radium(CatalogSection);
