import React, { Component } from 'react';
import { Card, CardMedia, CardText, CardHeader, CardTitle, CardActions } from 'material-ui/Card';
import Paper from 'material-ui/Paper';


import NoGmo from '../imgs/NonGMOnNeonicFree.gif';
import AirPhoto from '../imgs/AirPhoto.jpg';
import '../styles/home-styles.css';
import pgLogo from  '../imgs/peoria-logo-textwhite-transparent.png';
import frontOfCatalog from '../imgs/2016FrontCover.jpg';
import PersonnelPhoto from '../imgs/PeoriaPersonnel20Apr15.jpg';

import firebase from 'firebase';

import RaisedButton from 'material-ui/RaisedButton';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catalogDownload: ''
    }
  }

  componentWillMount() {
    firebase.storage().ref().child('2016 Catalog.pdf').getDownloadURL().then((url) => {
      this.setState({catalogDownload: url})
    });
  }

  render() {
    const styles = {
      div:{
        display: 'flex',
        flexFlow: 'row wrap',
        padding: 20,
        width: '100%'
      },
      topCard: {
        flex: 1,
        height: '100%',
        margin: 10,
        textAlign: 'left',
        padding: 10,
        minWidth: 500
      },
      cardLeft:{
        flex: 1,
        height: '100%',
        margin: 10,
        textAlign: 'center',
        padding: 10
      },
      cardRight:{
        height: 600,
        flex: 4,
        margin: 10,
        textAlign: 'center',
      },
      headline: {
        fontSize: 22,
        marginRight: 20,
        marginBottom: 12,
        fontWeight: 400,
      },
      paper: {
        height: 'auto',
        width: '25%',
        margin: 20,
        textAlign: 'center',
        display: 'inline-block',
      },
      noGmo: {
        width: 120,
        alignSelf: 'center',
        float: 'left',
        padding: 20
      },
      card: {
        width: 300,
        margin: 10
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
        float:'right',
        borderRadius: 15
      }
    };
    return (
      <div style={styles.div}>
        <Card style={styles.topCard}>
          <CardText style={styles.headline}> Peoria Gardens is a bedding plant nursery producing annuals, perennials, vegetable starts, herbs and hanging baskets for the wholesale trade
          </CardText>
          <CardMedia style={styles.noGmo}>
            <img src={NoGmo} alt="No GMO & Neonic Free" />
          </CardMedia>
          <CardText>
            We deliver in Western Oregon and Southwest Washington. Our customers, including the finest retail nurseries in the region, receive the highest quality plant materials along with excellent service.
          </CardText>
          <CardMedia style={styles.flowerImg}>
            <img src='http://www.peoriagardens.com/quality/images/perennials/AgastacheArizonaSun.jpg' alt='AgastacheArizonaSun' />
          </CardMedia>
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
        <Card style={styles.card}>
          <CardMedia>
            <img src={AirPhoto} alt='Peoria Gardens from the air' />
          </CardMedia>
          <CardText>Our greenhouses, located in the fertile Willamette Valley, grow high quality young plants for today's sophisticated gardens.</CardText>
          <CardText>Our lists also include grasses, ground covers, fall chrysanthemums, ornamental kale and poinsettias.</CardText>
        </Card>

        <Card style={styles.card}>
          <CardMedia style={{margin: 20}} overlay={<CardTitle
              title='2016 Catalog'
              subtitle='Wholesale Only' titleStyle={{fontSize: 20}} />}>
              <img src={frontOfCatalog} alt='catalog cover' />
            </CardMedia>
            <CardActions>
              <a href={this.state.catalogDownload}><RaisedButton label='Download 2016 Catalog' style={{marginLeft: '10%', marginRight: '10%'}}/></a>
            </CardActions>
          </Card>
        </div>
      );
    }
  }


export default Home;
