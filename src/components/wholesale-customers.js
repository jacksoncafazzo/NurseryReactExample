import React, { Component } from 'react';
import {Card, CardHeader, CardTitle, CardMedia, CardText } from 'material-ui/Card';
import PeoriaMap from '../imgs/peoriamap.gif';

export default class WholesaleCustomers extends Component {
  render() {
    let styles = {
      card: {
        textAlign: 'center'
      },
      map: {
        maxWidth: 200,
        marginLeft: '40%',
        marginRight: '40%'
      },
      title: {
        fontStyle: 'italic'
      },
      ul: {
        listStyleType: 'none'
      }
    }
    return (
      <div>
        <Card style={styles.card}>
          <CardText style={styles.title}>
            <h3>We welcome our wholesale customers to come by and visit us!</h3>
          </CardText>
          <CardText>
            Open hours are from 8 am to 4 pm Monday through Friday.
          </CardText>
          <CardMedia style={styles.map}>
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
      </div>
    );
  }
}
