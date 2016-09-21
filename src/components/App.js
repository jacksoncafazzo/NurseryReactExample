import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectTab, consumePlants } from './actions/index';
import { fetchUser, logoutUser } from './actions/firebase_actions';

import firebase from 'firebase';

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import Divider from 'material-ui/Divider';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import pgTheme from '../public/styles/pg-theme.js';
import { colors } from 'material-ui/styles';

import Footer from './footer';

import BannerWide from '../public/imgs/peoria-wide-banner.jpg';

import RenderTabs from './menu-tabs/render-tabs';

const styles = {
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

const auth = firebase.auth();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: (null !== auth.currentUser),
      currentUser: {},
      plants: {},
      slideIndex: 0,
      error: '',
      catalogKeys: {},
    }
    this.props.fetchUser();
    this.logOut = this.logOut.bind(this);
    this.handleMenuChange = this.handleMenuChange.bind(this);
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(firebaseUser => {
      this.setState({
        loggedIn: (null !== firebaseUser)
      });

      if (firebaseUser) {
        console.log('Logged IN', firebaseUser);
      } else {
        console.log('Not logged in');
      }
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  componentWillUnmount() {
    firebase.auth().onAuthStateChanged();
    window.removeEventListener('resize', this.handleResize.bind(this));
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
    console.log('newProps', slideIndex);
    this.setState({slideIndex});
    // this.setState({ slideIndex: slideIndex });
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
    const tabValues = [{
      tabName: 'Home',
      dataRoute: '/'
    },
    {
      tabName: 'About',
      dataRoute: '/',
    },
    {
      tabName: 'Plants',
      dataRoute: '/catalog',
    },
    {
      tabName: 'Wholesale',
      dataRoute: '/quality',
    },
    {
      tabName: 'Contact',
      dataRoute: '/personnel',
    }];

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(pgTheme)}>
      <div className='App'>
        <div style={{display:'flex',justifyContent:'center'}}>
        <img src={BannerWide} alt='Peoria Gardens Inc.' style={{margin: 10}}/>
        </div>
        <RenderTabs styles={styles} tabValues={tabValues} />
        {this.props.children}
        <Footer />
      </div>
    </MuiThemeProvider>
    );
  }
}

App.childContextTypes = {
  muiTheme: PropTypes.object.isRequired
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ fetchUser, consumePlants, selectTab }, dispatch);
}

function mapStateToProps({currentUser, plants, slideIndex}){
  return {currentUser, plants, slideIndex};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
