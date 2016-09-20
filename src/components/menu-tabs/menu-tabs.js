import React from 'react';
import Radium from 'radium';
import SwipeableViews from 'react-swipeable-views';
import { browserHistory, Link } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectTab } from '../actions/index';

import {Tabs, Tab} from 'material-ui/Tabs';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Divider from 'material-ui/Divider';

import Home from './home';
import Personnel from './personnel';

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

class MenuTabsSwipeable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0
    }
  }

  componentWillMount() {

  }

  handleChange = (value) => {
    this.props.selectTab(value);
    // this.setState({ slideIndex: value })
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

  handleActive(tab) {
    selectTab(tab.value);
    browserHistory.push(tab.props['data-route']);
  }

  renderTabs() {
    const tabNames = ['Home', 'About', 'Plants', 'Wholesale', 'Contact'];
    let tabArray = [];
    tabNames.forEach((tabName, i) => {
      if (i === 2) {
        tabArray.push(<Tab label={tabName} value={i}
          data-route='/catalog'
          onActive={this.handleActive.bind(this)}
          style={styles.default_tab}/>);
      } else {
        tabArray.push(<Tab label={tabName} value={i}  style={styles.default_tab}/>);
      }
    });
    return tabArray;
  }

  render() {
    return (
      <div>
        <Tabs
          onChange={this.handleChange}
          value={this.props.slideIndex}
          style={styles.tabs}
          className='menu-tabs'
          children={this.renderTabs()}>
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

function mapStateToProps({slideIndex}) {
  return { slideIndex };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectTab }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Radium(MenuTabsSwipeable));
