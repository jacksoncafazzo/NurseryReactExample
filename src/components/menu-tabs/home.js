import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import { connect } from 'react-redux';
import { Link, bindActionCreators } from 'redux';
import { selectTab } from '../actions/index';

import { Card, CardMedia, CardText, CardHeader, CardTitle, CardActions } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import { GridList, GridTile } from 'material-ui/GridList';
import Radium from 'radium';
import {colors} from 'material-ui/styles';

import NoGmo from '../../imgs/NonGMOnNeonicFree.gif';
import AirPhoto from '../../imgs/AirPhoto.jpg';
import pgLogo from  '../../imgs/peoria-logo-textwhite-transparent.png';
import BrachyMauve from '../../imgs/BracteanthaMohaveDarkRed.jpg';
import frontOfCatalog from '../../imgs/2016FrontCover.jpg';
import PersonnelPhoto from '../../imgs/PeoriaPersonnel20Apr15.jpg';
import FaPagelines from 'react-icons/lib/fa/pagelines';

import '../../styles/home-styles.css';

import firebase from 'firebase';

import RaisedButton from 'material-ui/RaisedButton';

const sampleImages = [
  {
    url: 'https://firebasestorage.googleapis.com/v0/b/peoria-gardens.appspot.com/o/images%2FCalamagrostisKarlFoerster.jpg?alt=media&token=4863176e-3516-468d-9761-d6f87f2d0505',
    altText: 'Calamagrostis Karl Foerster'
  },
  {
    url: 'https://firebasestorage.googleapis.com/v0/b/peoria-gardens.appspot.com/o/images%2FLaurentiaBlueStarCreeper.jpg?alt=media&token=9a6964d5-08c0-490e-a17b-2cac3b32a297',
    altText: 'Laurentia Blue Star Creeper'
  },
  {
    url: 'https://firebasestorage.googleapis.com/v0/b/peoria-gardens.appspot.com/o/images%2FMum4in.jpg?alt=media&token=2264c24a-0691-4473-91e3-8e0d235f4341',
    altText: 'Assorted Fall Mums'
  },
  {
    url: 'https://firebasestorage.googleapis.com/v0/b/peoria-gardens.appspot.com/o/images%2FKaleRedRussian.jpg?alt=media&token=48b4b3a1-c994-43b1-b118-de17c8b9f420',
    altText: 'Kale Red Russian'
  },
  {
    url: 'https://firebasestorage.googleapis.com/v0/b/peoria-gardens.appspot.com/o/images%2FPoinsettiaTapestry.jpg?alt=media&token=652e47ab-2334-4f60-aefc-caf012446647',
    altText: 'Poinsettia Tapestry'
  }
];

const styles = {
  topCard: {
    flex: 1,
    height: '100%',
    margin: 10,
    textAlign: 'left',
    padding: 10,
    maxWidth: 500,
    fontSize: 18,
  },
  // paper: {
  //   height: 'auto',
  //   width: '25%',
  //   margin: 20,
  //   textAlign: 'center',
  //   display: 'inline-block',
  // },
  noGmo: {
    width: 120,
    alignSelf: 'center',
    float: 'left',
    padding: 20
  },

  pgLogo: {
    width: 200,
    float: 'right',
    margin: 10,
    paddingRight: 0
  },
  subtitle: {
    paddingRight: 50
  },
  flowerImg: {
    width:200,
    padding:16,
    float:'left',
    borderRadius: 15
  },
  cardAction: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-around',
    alignItems: 'space-around'
  },
  gridList: {
    width: '100%',
    paddingBottom: 10,
    overflowY: 'auto',
    margin: 5,
  },
  gridItem: {

  }
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catalogDownload: '',
    }
  }

  handlePlantClick(e) {
    this.props.selectTab(2);
    browserHistory.push('/catalog')
  }

  render() {
    return (
      <div className='home-container'>
        <Card className='home-card'>
          <CardText><span className='headline'>Peoria Gardens Inc.</span>is a wholesale nursery located in the fertile Willamette Valley.
          </CardText>
          <CardMedia style={styles.flowerImg}>
            <img src={BrachyMauve} alt='Bracteantha Mohave Dark Red' />
          </CardMedia>
          <CardText>From humble beginnings as a backyard hobby, <span className='heavier'>Peoria Gardens</span> is the primary supplier of high quality bedding plants for nurseries throughout Western Oregon and Southwest Washington.
          </CardText>
          <CardText>
            <span className='heavier'>Our customers,</span> including the finest retail nurseries in the region, receive the highest quality plant materials along with excellent service.
          </CardText>
          <CardMedia style={styles.noGmo}>
            <img src={NoGmo} alt="No GMO & Neonic Free" />
          </CardMedia>
          <CardText>
            We offer a diverse stock of annuals, perennials, vegetable starts, herbs and hanging baskets and more.
          </CardText>
          <CardText>
            <ul style={{listStyle: 'none', paddingTop: 10}}>
              <li>
                For wholesale information, please contact us at:
              </li>
              <li><a href='mailto:sales@peoriagardens.com'>sales@peoriagardens.com</a></li>
              <li>Peoria Gardens, Inc.</li>
              <li>32355 Peoria Road</li>
              <li>Albany, OR 97321</li>
            </ul>
          </CardText>
        </Card>
        <Card className='home-card'>
          <CardMedia className='card-photo'>
            <img src={AirPhoto} alt='Peoria Gardens from the air' />
          </CardMedia>
          <CardText className='heavier' style={{fontSize:18, fontStyle:'italic'}}>We grow high quality young plants for today's sophisticated gardens.</CardText>
          <CardText>Our lists also include grasses, ground covers, fall chrysanthemums, ornamental kale and poinsettias.
          </CardText>
          <CardActions style={styles.cardAction}>
            <RaisedButton className='primary-button' label='plants' primary={true} icon={<FaPagelines />} onClick={this.handlePlantClick.bind(this)} />
            <RaisedButton label='Now Available' primary={true} className='primary-button'/>
          </CardActions>
        </Card>
        <GridList cellHeight={75} style={styles.gridList}
          cols={5}
          padding={5}
          children={sampleImages.forEach((tile) => {
            <GridTile key={tile.altText}>
              <img src={tile.url} alt={tile.altText} style={styles.gridItem} />
            </GridTile>})}>
          </GridList>
        </div>
      );
    }
  }

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectTab }, dispatch);
}

export default connect(null, mapDispatchToProps)(Radium(Home));
