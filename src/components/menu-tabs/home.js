import React, { Component } from 'react';
import { Card, CardMedia, CardText, CardHeader, CardTitle, CardActions } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import { GridList, GridTile } from 'material-ui/GridList';

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

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catalogDownload: '',
    }
  }

  render() {
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
    ]
    const styles = {
      div:{
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'space-around',
        padding: 20,
        width: '100%'
      },
      topCard: {
        flex: 1,
        height: '100%',
        margin: 10,
        textAlign: 'left',
        padding: 10,
        maxWidth: 500,
        fontSize: 18
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
        float:'left',
        borderRadius: 15
      },
      cardAction: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'space-around',
        alignItems: 'center'
      },
      gridList: {
        width: 50,
        height: 50,
        overflowY: 'auto',
        margin: 5,
      },
      nurseryDiv: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      }
    };
    return (
      <div style={styles.div}>
        <Card style={styles.topCard}>
          <CardText style={styles.headline}> Peoria Gardens is a wholesale nursery located in the fertile Willamette Valley.
          </CardText>
          <CardMedia style={styles.flowerImg}>
            <img src={BrachyMauve} alt='Bracteantha Mohave Dark Red' />
          </CardMedia>
          <CardText>From humble beginnings as a backyard hobby, Peoria Gardens now supplies high quality bedding plants to nurseries throughout Western Oregon and Southwest Washington.
          </CardText>
          <CardText>
            Our constantly-evolving stock offers annuals, perennials, vegetable starts, herbs and hanging baskets and more.
          </CardText>
          <CardActions style={styles.cardAction}>
            <RaisedButton label='Go to plants' primary={true} icon={<FaPagelines />}/>
            <RaisedButton label='Currently Available' />
          </CardActions>
          <CardMedia style={styles.noGmo}>
            <img src={NoGmo} alt="No GMO & Neonic Free" />
          </CardMedia>
          <CardText>
            Our customers, including the finest retail nurseries in the region, receive the highest quality plant materials along with excellent service.
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
        <div style={styles.nurseryDiv}>
        <Card style={styles.card}>
          <CardText style={{fontWeight:200, fontSize:16, fontStyle:'italic'}}>We grow high quality young plants for today's sophisticated gardens.</CardText>
          <CardMedia>
            <img src={AirPhoto} alt='Peoria Gardens from the air' />
          </CardMedia>
          <CardText>Our lists also include grasses, ground covers, fall chrysanthemums, ornamental kale and poinsettias.
          </CardText>


        </Card>
        <GridList cellHeight={200} style={styles.gridList}>
          {sampleImages.forEach((tile) => {
            <GridTile key={tile.altText}>
              <img src={tile.url} alt={tile.altText} />
            </GridTile>})}
          </GridList>
      </div>
        </div>
      );
    }
  }


export default Home;
