import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Search from 'material-ui/svg-icons/action/search'

import AutoComplete from 'material-ui/AutoComplete';

import '../../styles/catalog-index.css';

export default class CatalogSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sectionSearchRequest: '',
      genusSearchRequest: '',
      sciNameSearchRequest: ''
    }

  }

  onSectionInputChange(searchRequest, dataSource) {
    this.setState({ sectionSearchRequest: searchRequest });
  }

  onGenusInputChange(searchRequest, dataSource) {
    this.setState({ genusSearchRequest: searchRequest });
  }

  onSciNameInputChange(searchRequest, dataSource) {
    this.setState({ sciNameSearchRequest: searchRequest });
  }

  onFormSubmit(e) {
    e.preventDefault();
    console.log('u got search', this.state.searchRequest);
    // this.props.handleSearchRequest( {searchRequest: e.target.value});
    // this.setState({ searchRequest: searchRequest }); //this.props.selectSection(this.props.dispatch, this.state.searchRequest);
  }

  handleSciNameSearchChange(searchRequest, index) {
    let scientificNames = this.props.scientificNames;
    this.props.handleSearchRequest( {sciNameSearchRequest: scientificNames[index]});
  }

  handleSectionSearchChange(searchRequest, index) {
    let sectionNames = this.props.sectionNames;
    this.props.handleSearchRequest( {sectionSearchRequest: sectionNames[index]});
  }

  handleGenusSearchChange(searchRequest, index) {
    let genusNames = this.props.genusNames;
    this.props.handleSearchRequest({genusSearchRequest: genusNames[index]});
  }

  render() {
    let self = this;
    return (
      <form onSubmit={this.onFormSubmit.bind(this)}>
        <AutoComplete name='sectionRequest' floatingLabelText='Search for a plant by section'
          filter={AutoComplete.caseInsensitiveFilter}
          dataSource={this.props.sectionNames}
          onUpdateInput={this.onSectionInputChange.bind(this)} onNewRequest={self.handleSectionSearchChange.bind(this)}
          value={this.state.sectionSearchRequest} />
        <AutoComplete name='genusRequest' floatingLabelText='Search for a plant by name'
          filter={AutoComplete.caseInsensitiveFilter}
          dataSource={this.props.genusNames}
          onUpdateInput={this.onGenusInputChange.bind(this)} onNewRequest={self.handleGenusSearchChange.bind(this)}
          value={this.state.genusSearchRequest} />
        <AutoComplete name='sciNameRequest' floatingLabelText='Search for a plant by variety'
          filter={AutoComplete.caseInsensitiveFilter}
          dataSource={this.props.scientificNames}
          onUpdateInput={this.onSciNameInputChange.bind(this)} onNewRequest={self.handleSciNameSearchChange.bind(this)}
          value={this.state.sciNameSearchRequest} />
        <FloatingActionButton type='submit'>
          <Search />
        </FloatingActionButton>
      </form>
    );
  }
}
