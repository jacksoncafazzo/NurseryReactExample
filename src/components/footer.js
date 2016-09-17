import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation } from 'material-ui/BottomNavigation';
import BottomNavigationItem from '../custom-modules/BottomNavigationItem';
import Paper from 'material-ui/Paper';

import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import FaPagelines from 'react-icons/lib/fa/pagelines';
import HomeIcon from 'material-ui/svg-icons/action/home';
import AboutIcon from 'material-ui/svg-icons/action/face';
import ContactIcon from 'material-ui/svg-icons/action/question-answer';
import VerifiedUserIcon from 'material-ui/svg-icons/action/verified-user';

class PeoriaFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: this.props.slideIndex,
    };
    this.select = this.select.bind(this);
  }

  select(index) {
    this.setState({selectedIndex: index});
    this.props.handleMenuChange(index);
  }

  render() {
    return (
      <Paper zDepth={1}>
        <BottomNavigation selectedIndex={this.state.slideIndex}>
          <BottomNavigationItem
            label='Home'
            icon={<HomeIcon />}
            onTouchTap={() => this.select(0)}
            />
          <BottomNavigationItem
            label='About'
            icon={<AboutIcon />}
            onTouchTap={() => this.select(1)}
            />
          <BottomNavigationItem
            label='Plants'
            icon={<FaPagelines />}
            onTouchTap={() => this.select(2)}
            />
          <BottomNavigationItem
            label='Wholesale'
            icon={<VerifiedUserIcon />}
            onTouchTap={() => this.select(3)}
            />
          <BottomNavigationItem
            label='Contact'
            icon={<ContactIcon />}
            onTouchTap={() =>
              this.select(4)}
              />
          </BottomNavigation>
        </Paper>
      );
    }
  }

  export default PeoriaFooter;
