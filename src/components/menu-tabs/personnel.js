import React, {Component} from 'react';
import { Card, CardHeader, CardText, CardMedia} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import { Link } from 'react-router';
import Subheader from 'material-ui/Subheader';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';

import CatalogImage from '../../public/imgs/2016FrontCover.jpg'
import '../../public/styles/personnel.css';

const images = '../../public/imgs/personnel';

const styles = {
  logo: {
    width: 150,
    margin: 'auto'
  },
  title: {
    fontFamily: 'Vollkorn, serif',
    fontWeight: 500,
    fontSize: 30,
    width: '100%',
    textAlign: 'center'
  },
  cardTitle: {
    fontFamily: 'Vollkorn, serif',
    fontSize: 18,
    fontWeight: 500
  }
}

export default class Personnel extends Component {
  render() {
    return (
      <div>
        <div className='personnel-address-card'>
          <Paper>
          <img src='https://firebasestorage.googleapis.com/v0/b/peoria-gardens.appspot.com/o/medium-peoria-app-icon.png?alt=media&token=2c86dcbe-3a29-46c5-a24e-2ab589a4689a' alt='Peoria Gardens Logo'
            style={styles.logo} />
        </Paper>
          <Paper className='address'>
            <span style={{fontSize: 18}}>Peoria Gardens, Inc.</span><br />
            <span>
              32355 Peoria Road</span><br />
            <span>Albany, OR 97321</span>
            <span>Phone: (541) 753-8519</span>
          </Paper>
          <Paper className='address'>
          <a href='https://firebasestorage.googleapis.com/v0/b/peoria-gardens.appspot.com/o/2016%20Catalog.pdf?alt=media&token=c93b6aea-a070-4284-b3e7-4eacb18616d2'><img src={CatalogImage} style={{width:80}}/></a>
          <span style={{fontStyle:'italic'}}>Download our current catalog</span>
          </Paper>
      </div>
      <Card className='personnel-index-card'>
        <CardHeader title='Peoria Gardens Personnel' titleStyle={styles.title} className='personnel-title' />
      <div className='personnel-index-card'>
       <Card className='personnel-card'>
          <CardHeader title='Ben Verhoeven' subtitle='President and General Manager' titleStyle={styles.cardTitle} />
          <CardMedia><img src='https://firebasestorage.googleapis.com/v0/b/peoria-gardens.appspot.com/o/images%2Fpersonnel%2FBen_Verhoeven.jpg?alt=media&token=1a1631d5-69ca-4d00-860c-bd8dd6a3d0bf' alt='Ben Verhoeven' /></CardMedia>
          <CardText>
            <span style={{color: darkBlack}}>Ben Verhoeven - </span>
            <a href='mailto:benv@peoriagardens.com'>benv@peoriagardens.com</a>
          </CardText>
        </Card>
        <Card className='personnel-card'>
          <CardHeader title='Tom Verhoeven' subtitle='Vice President and Head Grower' titleStyle={styles.cardTitle} />
          <CardMedia><img src='https://firebasestorage.googleapis.com/v0/b/peoria-gardens.appspot.com/o/images%2Fpersonnel%2FTomVC2.jpg?alt=media&token=3830c4ee-3870-4071-b395-0fb878bbab66' alt='Tom Verhoeven' /></CardMedia>
          <CardText>
            <span style={{color: darkBlack}}>Tom Verhoeven - </span>
            <a href='mailto:tomv@peoriagardens.com'>tomv@peoriagardens.com</a>
          </CardText>
        </Card>
        <Card className='personnel-card'>
          <CardHeader title='Tom Cammarota' subtitle='Sales & Perennial Production Manager' titleStyle={styles.cardTitle} />
          <CardMedia><img src='https://firebasestorage.googleapis.com/v0/b/peoria-gardens.appspot.com/o/images%2Fpersonnel%2FTomC09.jpg?alt=media&token=b86747d4-0f88-4c87-9936-ee7e28530ac2' alt='Tom Cammarota' /></CardMedia>
          <CardText>
            <span style={{color: darkBlack}}>Tom Cammarota - </span><a href='mailto:sales@peoriagardens.com'>sales@peoriagardens.com</a>
          </CardText>
        </Card>
        <Card className='personnel-card'>
          <CardHeader title='Sarah Noble' subtitle='Office Manager' titleStyle={styles.cardTitle} />
          <CardMedia>
            <img src='https://firebasestorage.googleapis.com/v0/b/peoria-gardens.appspot.com/o/images%2Fpersonnel%2FSarah.jpg?alt=media&token=b0340766-e22e-4a5e-b065-f88a7e010403' alt='Sarah Noble' />
          </CardMedia>
        <CardText>
            <span style={{color: darkBlack}}>Sarah Noble - </span>
            <a href='mailto:accounts@peoriagardens.com'>accounts@peoriagardens.com</a>
          </CardText>
        </Card>
        <Card className='personnel-card'>
          <CardHeader title='Lauren Brown' subtitle='Propagation Supervisor' titleStyle={styles.cardTitle} />
            <CardMedia>
              <img src='https://firebasestorage.googleapis.com/v0/b/peoria-gardens.appspot.com/o/images%2Fpersonnel%2FLaurenBrown.jpg?alt=media&token=adcb2c12-b74c-40d7-9aa1-d0b994ee2c13' alt='Lauren Brown' />
            </CardMedia>
          <CardText>
            <span style={{color: darkBlack}}>Lauren Brown - </span>
            <a href='mailto:lauren@peoriagardens.com'>lauren@peoriagardens.com</a>
          </CardText>
        </Card>
        <Card className='personnel-card'>
          <CardHeader title='Melissa Giancola' subtitle='Assistant Grower' titleStyle={styles.cardTitle} />
          <CardMedia>
            <img src='https://firebasestorage.googleapis.com/v0/b/peoria-gardens.appspot.com/o/images%2Fpersonnel%2FMelissaG.jpg?alt=media&token=7befceb0-eea9-45da-b5aa-77b32cac728e' alt='Melissa Giancola' />
          </CardMedia>
          <CardText>
            <span style={{color: darkBlack}}>Melissa Giancola - </span>
            <a href='mailto:melissa@peoriagardens.com'>melissa@peoriagardens.com</a>
          </CardText>
        </Card>
        <Card className='personnel-card'>
          <CardHeader title='Nico Ardens' subtitle='Assistant Grower' titleStyle={styles.cardTitle} />
          <CardMedia>
            <img src='https://firebasestorage.googleapis.com/v0/b/peoria-gardens.appspot.com/o/images%2Fpersonnel%2FNico.jpg?alt=media&token=f2a02e44-8e21-4efb-b130-d985266a816e' alt='Nico Ardens' />
          </CardMedia>
          <CardText>
            <span style={{color: darkBlack}}>Nico Ardans - </span>
            <a href='mailto:nico@peoriagardens.com'>nico@peoriagardens.com</a>
          </CardText>
        </Card>
      </div>
    </Card>
    </div>

    );
  }
}
