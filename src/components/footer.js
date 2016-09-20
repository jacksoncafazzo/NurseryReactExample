import React, {Component} from 'react';
import { browserHistory } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectTab } from './actions/index';

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
      slideIndex: 0
    }

    this.select = this.select.bind(this);
  }

  select(index) {
    if (index === 2) {
      this.props.selectTab(index);
      browserHistory.push('/catalog');
    } else {
      if (this.props.slideIndex === 2) {
        browserHistory.push('/');
      }
      this.props.selectTab(index);
      this.setState({slideIndex: index});
    }
  }

  render() {
    return (
      <Paper zDepth={1}>
        <BottomNavigation selectedIndex={this.props.slideIndex}>
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

  function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectTab }, dispatch);
  }

  function mapStateToProps({slideIndex}) {
    return { slideIndex: slideIndex };
  }


  export default connect(mapStateToProps, mapDispatchToProps)(PeoriaFooter);
