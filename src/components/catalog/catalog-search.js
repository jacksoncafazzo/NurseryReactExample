import React, { Component } from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Search from 'material-ui/svg-icons/action/search'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectSection, getAllSectionsWithNames } from '../actions/firebase_actions';
import AutoComplete from 'material-ui/AutoComplete';

import './styles/catalog-index.css';

class CatalogSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchRequest: ''
    }

  }

  onInputChange(searchRequest, dataSource) {
    this.setState({ searchRequest: searchRequest });
  }

  onFormSubmit(e) {
    e.preventDefault();
    console.log('u got search', this.state.searchRequest)
    // this.setState({ searchRequest: searchRequest }); //this.props.selectSection(this.props.dispatch, this.state.searchRequest);
  }

  handleSearchChange(searchRequest, index) {
    let genusNames = this.props.genusNames;
    //console.log('searchRequest', genusNames[index]);
    this.props.handleSearchRequest( {searchRequest: genusNames[index]});
    //this.setState({searchRequest: ''});

  }

  render() {
    let self = this;
    return (
      <form onSubmit={this.onFormSubmit}>
        <AutoComplete name='searchRequest' floatingLabelText='Search for a plant name'
          filter={AutoComplete.caseInsensitiveFilter}
          dataSource={this.props.genusNames}
          onUpdateInput={this.onInputChange.bind(this)} onNewRequest={self.handleSearchChange.bind(this)}
          value={this.state.searchRequest} />
        <FloatingActionButton type='submit'>
          <Search />
        </FloatingActionButton>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch, state) {
  return bindActionCreators({ selectSection }, dispatch);
}

export default connect(null, mapDispatchToProps)(CatalogSearch);
