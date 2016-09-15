import React, { Component } from 'react';
import firebase from 'firebase';

import {Card, CardHeader, CardTitle, CardMedia, CardText,CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

import GoogleMap from './google-map';

import PeoriaMap from '../../imgs/peoriamap.gif';
import frontOfCatalog from '../../imgs/2016FrontCover.jpg';
import pgCrew from '../../imgs/PeoriaPersonnel20Apr15.jpg';

export default class WholesaleCustomers extends Component {
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
    let styles = {
      div: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center'
      },
      card: {
        textAlign: 'center',
        maxWidth: 300
      },
      topCard: {
        width: 420,
        textAlign: 'center',
        justifyContent: 'center'
      },
      cardImage: {
        marginLeft: '5%',
        marginRight: '5%'
      },
      mapImage: {
        margin: '20%',
        marginBottom: 20,
        marginTop: 20
      },
      title: {
        fontStyle: 'italic'
      },
      ul: {
        listStyleType: 'disc',
        textAlign: 'left'
      },
      catalogImg: {
        margin: 20
      }
    }
    return (
      <div style={styles.div}>
        <Card style={styles.topCard}>
          <CardText style={styles.title}>
            <h3>We welcome our wholesale customers to come by and visit us!</h3>
          </CardText>
          <CardText>
            We are open<br />
          8 am to 4 pm<br />
        Monday through Friday.<br />
          </CardText>
          <CardMedia style={styles.cardImage}>
            <img src={pgCrew} />
          </CardMedia>
        </Card>
          <Card style={styles.card}>
          <CardMedia style={styles.mapImage}>
            <img src={PeoriaMap} alt='map to Peoria Gardens' />
          </CardMedia>
          <CardText>
            <h4>Directions:</h4>
            <ul style={styles.ul}>
              <li>
                In Oregon, from I-5, take exit #228 westbound towards Corvallis on Highway 34.</li>
              <li>
                Go about 10 miles to the intersection of Peoria Road & Hwy 34 and turn left (South). This intersection is marked by the first stoplight you will encounter as you come near to Corvallis. </li>
              <li>
                Once on Peoria Road, travel south for 4 miles and you will see our greenhouses on the left (east) side of the road.</li>
            </ul>
          </CardText>
          </Card>
        <Card style={styles.card}>
          <CardMedia style={styles.catalogImg}>
            <img src={frontOfCatalog} alt='catalog cover' />
          </CardMedia>
          <CardTitle
            title='2016 Catalog'
            subtitle='Wholesale Only' titleStyle={{fontSize: 20}} />
          <CardActions>
            <a href={this.state.catalogDownload}><RaisedButton label='Download 2016 Catalog' style={{marginLeft: '10%', marginRight: '10%'}} primary={true}/></a>
          </CardActions>
        </Card>
      </div>
    );
  }
}
