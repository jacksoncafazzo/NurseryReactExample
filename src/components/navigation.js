import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default class NavContainer extends Component {
  static propTypes = {
    desktop: PropTypes.func,
    focusState: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      windowWidth: window.innerWidth,
      mobileNavVisible: false
    };
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
    if (this.state.loggedIn) {
      return (
        <MenuItem>
          <Link to='/logout'>Logout</Link>
        </MenuItem>
      );
    } else {
      return (
        <div>
          <MenuItem>
            <Link to='/login'>Login</Link>
          </MenuItem>
          <MenuItem>
            <Link to='/register'>
              Register
            </Link>
          </MenuItem>
        </div>
      );
    }
  }

  renderNavigation() {
    return (
      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        >
        <MenuItem><Link to='/'>Welcome</Link></MenuItem>
        <MenuItem><Link to='/addflower'>Add  flower</Link></MenuItem>
        {this.renderLoginOrLogout()}
      </IconMenu>
    );
  }

  render() {
    return(
      <AppBar
        title='a good site...'
        iconElementLeft={<IconButton><NavigationClose /></IconButton>}
        iconElementRight={this.renderNavigation()}
      />
    );
  }
}
