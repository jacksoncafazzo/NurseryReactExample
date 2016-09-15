import React from 'react';
import Radium from 'radium';
import {Tabs, Tab} from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
import Home from './home';
import Personnel from './personnel';
import CatalogIndex from './catalog/catalog-index';
import WholesaleCustomers from './wholesale-customers';

import { colors } from 'material-ui/styles';


const styles = {
  contactSlide: {
    paddingLeft: '30%',
    textAlign: 'left',
  },
  plantsSlide: {
    padding: 'auto',
    textAlign: 'left'
  },
  default_tab:{
    color: colors.white,
    backgroundColor: colors.green500,
    fontWeight: 400,
  },
  active_tab:{
    color: colors.yellowA200,
    borderColor: colors.yellowA200
  },
  inkBarStyle: {
    background: colors.amber500
  }
};

class MenuTabsSwipeable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
  }

  componentWillMount() {

  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  handleWholesale = (e) => {
    console.log(e.target);
  }

  render() {
    let styles= {
      tab: {
        background: [
        `linear-gradient(${colors.lightGreen500}, ${colors.green500})`
        ,
        colors.lightGreen500
        ],
        fontWeight: 400
      },

    }
    return (
      <div>
        <Tabs
          onChange={this.handleChange}
          value={this.state.slideIndex}
          tabItemContainerStyle={styles.tab}
        >
          <Tab label='Home' value={0} />
          <Tab label='About' value={1} />
          <Tab label='Plants' value={2} />
          <Tab label='Wholesale' value={3} onClick={this.handleWholesale} />
          <Tab label='Contact' value={4} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <div className='home' >
            <Home />
          </div>
          <div className='about'>
            about
          </div>
          <div>
            <CatalogIndex />
          </div>
          <div className='wholesale-lists' >
            <WholesaleCustomers />
          </div>
          <div className='contact'>
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

export default Radium(MenuTabsSwipeable);
