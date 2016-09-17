import React from 'react';
import Radium from 'radium';
import SwipeableViews from 'react-swipeable-views';
import Link from 'react-router';
import {Tabs, Tab} from 'material-ui/Tabs';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import Home from './home';
import Personnel from './personnel';
import CatalogIndex from '../catalog/catalog-index';
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
  tabs: {
    maxHeight: 700
  },
  default_tab:{
    color: colors.white,
    background: [
    `linear-gradient(${colors.lightGreen500}, ${colors.green500})`,

    // fallback
    colors.lightGreen500,
    ],
    fontWeight: 700,
  },
  active_tab:{
    color: colors.yellowA200,
    borderColor: colors.yellowA200
  },
  inkBarStyle: {
    background: colors.amber500
  },
};

const tabNames = ['Home', 'About', 'Plants', 'Wholesale', 'Contact']

class MenuTabsSwipeable extends React.Component {
  constructor(props) {
    super(props);

  }

  componentWillMount() {

  }

  handleChange = (value) => {
    this.props.handleMenuChange(value);
  };

  handleWholesale = (e) => {
    console.log(e.target);
  }

  renderUserMenu(currentUser){
    // if current user exists and user id exists than make user navigation
    if (currentUser && currentUser.uid) {
      return [
        <MenuItem key={3}>
          <Link to='/profile'>Profile</Link>
        </MenuItem>,
        <Divider />,
        <MenuItem key={4}> <Link to='/logout' onClick={this.logOut}>Logout</Link></MenuItem>
        ];
      } else
      return [
         <MenuItem key={1}><Link to='/login'>Login</Link></MenuItem>,
         <MenuItem key={2}><Link to='/register'>Register</Link></MenuItem>
      ]

  }


  render() {
    return (
      <div>
        <Tabs
          onChange={this.handleChange}
          value={this.props.slideIndex}
          style={styles.tabs}
          className='menu-tabs'
          children={[
            <Tab label='Home' value={0} style={styles.default_tab}/>,
            <Tab label='About' value={1} style={styles.default_tab}/>,
            <Tab label='Plants' value={2} style={styles.default_tab}/>,
            <Tab label='Wholesale' value={3} onClick={this.handleWholesale} style={styles.default_tab}/>,
            <Tab label='Contact' value={4} style={styles.default_tab}/>
          ]}>
        </Tabs>
        <SwipeableViews
          index={this.props.slideIndex}
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
