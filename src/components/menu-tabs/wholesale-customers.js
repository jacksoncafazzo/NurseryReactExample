import React, { Component } from 'react';
import Radium from 'radium';
import firebase from 'firebase';
import { browserHistory } from 'react-router';

import {Card, CardHeader, CardTitle, CardMedia, CardText,CardActions } from 'material-ui/Card';
import { Tabs, Tab } from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';
import {colors} from 'material-ui/styles';

import RenderTabs from './render-tabs';

import SwipeableViews from 'react-swipeable-views';

// import GoogleMap from './google-map';

import PeoriaMap from '../../public/imgs/peoriamap.gif';
import frontOfCatalog from '../../public/imgs/2016FrontCover.jpg';
import pgCrew from '../../public/imgs/PeoriaPersonnel20Apr15.jpg';

import Accessible from 'material-ui/svg-icons/action/accessible';

const styles = {
  div: {
    display: 'flex',
    flexFlow: 'column wrap',
    justifyContent: 'space-around'
  },
  default_tab: {
    background: [
      `linear-gradient(${colors.green500}, ${colors.amber500})`,
      // fallback
      colors.lightGreen500,
    ],
    color: 'white',
    fontWeight: 'bold'
  },
  cards: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-around'
  },
  welcomeCard: {
    width: 420,
    margin: 10,
    textAlign: 'center',
    justifyContent: 'center'
  },
  card: {
    width: 360,
    margin: 10
  },
  cardImage: {
    marginLeft: '5%',
    marginRight: '5%'
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
  },
  mapImage: {
    margin: 7,
  },
  inkBarStyle: {
    background: colors.red900
  }
}


class WholesaleCustomers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catalogDownload: '',
      wholesaleSlideIndex: 0
    }
  }

  componentWillMount() {
    firebase.storage().ref().child('2016 Catalog.pdf').getDownloadURL().then((url) => {
      this.setState({catalogDownload: url})
    });
  }

  handleActive(tab) {
    location.assign(tab.props['data-route'])
    // selectTab(tab.value);
  //  browserHistory.push(tab.props['data-route']);
  }

  handleChange(value) {
    this.setState({ slideIndex: value })
  };

  render() {

    const tabValues = [{
      tabName: 'welcome',
      dataRoute: '#'
    },
    {
      tabName: 'catalog',
      dataRoute: 'https://firebasestorage.googleapis.com/v0/b/peoria-gardens.appspot.com/o/2016%20Catalog.pdf?alt=media&token=c93b6aea-a070-4284-b3e7-4eacb18616d2'
    },
    {
      tabName: 'now blooming',
      dataRoute: 'https://firebasestorage.googleapis.com/v0/b/peoria-gardens.appspot.com/o/Availability.xls?alt=media&token=1deb9a39-e62e-4452-8db4-28285d5910b7',
    },
];

    return (
      <div style={styles.div}>
        <Tabs
          style={styles.tabs}
          className='menu-tabs'
          inkBarStyle={styles.inkBarStyle}
          children={tabValues.map((tab, i) => {
            return (<Tab label={tab.tabName} value={i}
                data-route={tab.dataRoute}
                onActive={this.handleActive}
                style={styles.default_tab} />)
              })}>
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
        <div style={styles.cards}>
        <Card style={styles.welcomeCard}>
          <CardText>
            <h3 className='headline'>We welcome our wholesale customers to come by and visit!</h3>
          </CardText>
          <CardMedia style={styles.cardImage}>
            <img src={pgCrew} alt='Peoria Gardens Personnel'/>
          </CardMedia>
          <CardText style={{fontStyle:'italic'}}>
            Peoria Gardens Personnel in April 1016
          </CardText>
          <CardText>
            <span className='heavier' style={{fontStyle:'italic'}}>We are open</span><br />
            8 am to 4 pm<br />
          Monday through Friday.<br />
            Much of the property is paved and quite accessible <Accessible />
          </CardText>
        </Card>
        <Card style={styles.card}>
          <CardText>
            <h4 className='headline'>Directions:</h4>
            <ul style={styles.ul}>
              <li>
                In Oregon, from I-5, take exit #228 westbound towards Corvallis on Highway 34.</li>
              <li>
                Go about 10 miles to the intersection of Peoria Road & Hwy 34 and turn left (South). This intersection is marked by the first stoplight you will encounter as you come near to Corvallis. </li>
              <li>
                Once on Peoria Road, travel south for 4 miles and you will see our greenhouses on the left (east) side of the road.</li>
            </ul>
            <CardMedia style={styles.mapImage}>
              <img src={PeoriaMap} alt='map to Peoria Gardens' />
            </CardMedia>
          </CardText>
          </Card>
        </div>

        <div className='catalog' >
          Link to catalog
        </div>

        <div className='now-blooming'>
          link to availability
        </div>
        </SwipeableViews>
      </div>
    );
  }
}

export default Radium(WholesaleCustomers);

// <Card style={styles.card}>
//   <CardMedia style={styles.catalogImg}>
//     <img src={frontOfCatalog} alt='catalog cover' />
//   </CardMedia>
//   <CardTitle
//     title='2016 Catalog'
//     subtitle='Wholesale Only' titleStyle={{fontSize: 20}} />
//   <CardActions>
//     <a href={this.state.catalogDownload}><RaisedButton label='Download 2016 Catalog' style={{marginLeft: '10%', marginRight: '10%'}} primary={true}/></a>
//   </CardActions>
// </Card>
