import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser,logoutUser }  from './actions/firebase_actions';
import { currentUser } from './utils/local-storage';
import MenuTabsSwipeable from './menu-tabs/menu-tabs';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Divider from 'material-ui/Divider';

class NavContainer extends Component {
  static propTypes = {
    desktop: PropTypes.func,
    focusState: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      windowWidth: window.innerWidth,
      mobileNavVisible: false,
    };
    this.props.fetchUser();
  }

  handleResize() {
    this.setState({windowWidth: window.innerWidth});
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this));
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

  renderLoginOrLogout() {
    if (this.props.user && this.props.user.uid) {
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
        {this.renderUserMenu(this.props.currentUser)}
      </IconMenu>
    );
  }

  render() {
    return(
      <AppBar
        title='Peoria Gardens'
        children={<MenuTabsSwipeable />}
        iconElementLeft={<IconButton><NavigationClose /></IconButton>}
        iconElementRight={this.renderNavigation()}
      />
    );
  }
}

function mapDispatchToProps(dispatch){
  return  bindActionCreators({ fetchUser, logoutUser }, dispatch);
}


function mapStateToProps(state){
  return { currentUser : state.currentUser };
}


export default connect(mapStateToProps, mapDispatchToProps)(NavContainer);
