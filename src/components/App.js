import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

import { fetchUser, logoutUser } from './actions/firebase_actions';
import firebase from 'firebase';

import Navigation from './navigation';

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import Divider from 'material-ui/Divider';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import pgTheme from '../styles/pg-theme.js';
import Footer from './footer';

import MenuTabsSwipeable from './menu-tabs/menu-tabs';

import BannerWide from '../imgs/peoria-wide-banner.jpg';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      error: '',
      slideIndex: 0,
    }
    this.props.fetchUser();
    this.logOut = this.logOut.bind(this);
    this.handleMenuChange = this.handleMenuChange.bind(this);
  }

  handleChange(value) {
    this.setState({ slideIndex: value });
  }

  logOut() {
    this.props.logoutUser().then(data => {
      this.props.fetchUser();
    });
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(pgTheme)};
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  componentWillUnmount() {
    firebase.auth().onAuthStateChanged();
    window.removeEventListener('resize', this.handleResize.bind(this));
  }

  handleResize() {
    this.setState({windowWidth: window.innerWidth});
  }


  renderMobileNav() {
    if(this.state.mobileNavVisible) {
      return this.navigationLinks();
    }
  }

  handleNavClick() {
    if(!this.state.mobileNavVisible) {
      this.setState({mobileNavVisible: true});
    } else {
      this.setState({mobileNavVisible: false});
    }
  }

  handleMenuChange(slideIndex) {
    console.log('newProps', slideIndex)
    this.setState({ slideIndex: slideIndex });
  }

  renderLoginOrLogout() {
    if (this.props.currentUser && this.props.currentUser.uid) {
      return (
        <MenuItem key={4}>
          <Link to='/logout' onClick={this.props.logOut}>Logout</Link>
        </MenuItem>
      );
    } else {
      return (
        <div>
          <MenuItem key={1}>
            <Link to='/login'>Login</Link>
          </MenuItem>
          <MenuItem key={2}>
            <Link to='/register'>
              Register
            </Link>
          </MenuItem>
        </div>
      );
    }
  }

  renderUserMenu(currentUser){
    // if current user exists and user id exists than make user navigation
    if (currentUser && currentUser.uid) {
      return [
        <MenuItem key={3}>
          <Link to='/profile'>Profile</Link>
        </MenuItem>,
        <Divider key={7} />,
        <MenuItem key={4}> <Link to='/logout' onClick={this.logOut}>Logout</Link></MenuItem>
        ];
      } else
      return [
         <MenuItem key={1}><Link to='/login'>Login</Link></MenuItem>,
         <MenuItem key={2}><Link to='/register'>Register</Link></MenuItem>
      ]
  }

  renderNavigation() {
    return (
      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        >
        <MenuItem><Link to='/'>Welcome</Link></MenuItem>
        <MenuItem><Link to='/update'>Update</Link></MenuItem>

        {this.renderUserMenu(this.props.currentUser)}
      </IconMenu>
    );
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(pgTheme)}>
      <div className='App'>
        <div style={{display:'flex',justifyContent:'center'}}>
        <img src={BannerWide} alt='Peoria Gardens Inc.' style={{margin: 10}}/>
        </div>
        <MenuTabsSwipeable user={this.state.currentUser} slideIndex={this.state.slideIndex} handleMenuChange={this.handleMenuChange} />
        {this.props.children}
        <Footer slideIndex={this.state.slideIndex} handleMenuChange={this.handleMenuChange} />
      </div>
    </MuiThemeProvider>
    );
  }
}

App.childContextTypes = {
  muiTheme: PropTypes.object.isRequired
}

function mapDispatchToProps(dispatch){
  return  bindActionCreators({ fetchUser, logoutUser }, dispatch);
}

function mapStateToProps({currentUser}){
  return {currentUser};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
