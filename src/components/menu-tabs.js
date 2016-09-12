import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
import Home from './home';
import Personnel from './personnel';
import CatalogIndex from './catalog/catalog-index';
import CatalogSearch from './catalog/catalog-search'

const styles = {
  contactSlide: {
    paddingLeft: '30%',
    textAlign: 'left',
  },
  plantsSlide: {
    padding: 'auto',
    textAlign: 'left'
  }
};

export default class MenuTabsSwipeable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  render() {
    return (
      <div>
        <Tabs
          onChange={this.handleChange}
          value={this.state.slideIndex}
        >
          <Tab label='Home' value={0} />
          <Tab label='About' value={1} />
          <Tab label='Wholesale Lists' value={2} />
          <Tab label='Plants' value={3} />
          <Tab label='Contact' value={4} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <div className='home'>
            <Home />
          </div>
          <div className='about' style={styles.slide}>
            <h2>about</h2>
          </div>
          <div className='wholesale-lists' style={styles.slide}>
            <h1>listsssss</h1>
          </div>
          <div style={styles.plantsSlide}>
            <CatalogIndex />
          </div>
          <div className='contact' style={styles.contactSlide}>
            <Personnel />
            <h5>For wholesale information, please contact us at:
            </h5>
            <h5><a href='mailto:sales@peoriagardens.com'>sales@peoriagardens.com</a><br />
            <br />Peoria Gardens, Inc.
            <br />32355 Peoria Road
            <br />Albany, OR 97321 </h5>
          </div>
        </SwipeableViews>
      </div>
    );
  }
}
