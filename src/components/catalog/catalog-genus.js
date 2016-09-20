import React, { Component } from 'react';
import Radium from 'radium';
import { Card, CardHeader, CardTitle, CardText, CardMedia, CardActions } from 'material-ui/Card';
// import CatalogGenus2 from './catalog-genus2.js';
import '../../styles/catalog-index.css';
import Toggle from 'material-ui/Toggle';
import CatalogVariety from './catalog-variety';
import AddImage from '../add/add-image';
import RaisedButton from 'material-ui/RaisedButton';
import ImageEdit from 'material-ui/svg-icons/image/edit';

const styles = {
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
  title: {
    fontFamily: [
      'Vollkorn',
      'serif'
    ]
  }
}


const plantsRef = firebase.database().ref('plants/sections');
const catalogRef = firebase.database().ref('catalog');

class CatalogGenus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sectionName: props.sectionName,
      title: props.title,
      genus: props.genus
    }
  }

  componentWillMount() {
    let { genus, title, sectionName } = this.props;
    if (genus.initialSnap) {
      //we need to get the varieties
      console.log('genus mounted', genus, title, sectionName);

      //we want to add sizes, heights, gpDescs to variety if they have the same name
      title = title.trim();
      //you dont want to but go to the catalog and get things genus
      catalogRef.orderByChild('Genus').startAt(title).endAt(title).once('value', (snapshot) => {
        //we startin over
        let varieties = {};

        let varietyCheck = [];
        let genusSnap = snapshot.val();
        if (!genusSnap) {
          console.log('db doesnt have that genus', genus, title, sectionName);

        } else {
          Object.keys(genusSnap).map((plantKey) => {
            let v = genusSnap[plantKey];
            let varietyName = this.makeVarietyNameCool(v, title);

            let isInVarieties = varietyCheck.includes(varietyName);

            if (!isInVarieties) {
              varietyCheck.push(varietyName);
              varieties[varietyName] = {
                initialSnap: true,
                Description: v['Description'],
                height: v['Height'],
                sizes: [v['Pot Category']],
                gpDescs: [v['GROWPOINT ITEMDESC']],
                volumes: [v['Volume US (Metric)']],
                scientificName: `${v['Genus 2']} ${v['Species 2']}`
              };
            } else {
              //it is in varieties
              varieties[varietyName].sizes.push(v['Pot Category']);
              varieties[varietyName].gpDescs.push(v['GROWPOINT ITEMDESC']);
              varieties[varietyName].volumes.push(v['Volume US (Metric)']);
            }

          });
          //loop through snap ends

          //save to plants ref. u scared?

          //save the genus varieties back overwriting previous values
          plantsRef.child(`${sectionName}/genera/${title}/varieties`).set(varieties);

          //update the genus
          plantsRef.child(`${sectionName}/genera/${title}`).update({
            initialSnap: false,
          });

          genus.varieties = varieties;
          this.setState({genus})
        }
      });
      //snap call ends

    } else {
      //is not initial snap..wanna be brave and set listener? yuh boy
      plantsRef.child(`${sectionName}/genera/${title}`).on('value', (snapshot) => {
        this.setState({ genus: snapshot.val()});
      })

    }
  }

  componentWillUnmount() {
    let { sectionName, title } = this.state;
    plantsRef.child(`${sectionName}/genera/${title}`).off();
  }


  makeVarietyNameCool(variety, title) {
    let varietyName = variety.varietyName;
    let plantGenusName = title;
    if (!varietyName) {
      varietyName = variety['Variety 2'];
      if (!varietyName) {
        varietyName = variety['Species 2'];
        if (!varietyName) {
          console.log('man, ur variety is super weird', varietyName, variety);
          varietyName = title;
        }
      }
    }
    varietyName = varietyName.replace(/[.$#\/\[\]]/g, '-').trim();
    return varietyName;
  }


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
    let { title, sectionName } = this.props;
    let { genus } = this.state;

    if (genus) {
      let { subtitle, Description, key, img, varieties, refString } = genus;
      let genusKey = key;
      let avatar = img;
      return (
        <Card className='genus-card'>
          <CardHeader
            className='genus-card-header'
            title={<CardTitle
              title={title}
              titleStyle={styles.title}
              subtitle={Description}
              subtitleStyle={styles.subtitle}
              />}
              actAsExpander={true}
              showExpandableButton={true}
              avatar={avatar}
              />
            <CardActions expandable={true}>
              <AddImage plant={genus} refString={refString} />
              </CardActions>
              <CardText className='genus-card-variety' expandable={true}>
                <CatalogVariety varieties={genus.varieties} subtitle={subtitle} refString={refString} genusName={title} genusKey={genusKey} styles={styles} />
              </CardText>
            </Card>
          );
    } else {
      return (<div>loading</div>)
    }
  }
}


  export default Radium(CatalogGenus);
