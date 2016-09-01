import React, { Component, PropTypes } from 'react';
import firebase from 'firebase';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

class AddSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      section: '',
    }
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  addSection(e) {
    e.preventDefault();
    let { section } = this.state;
    firebase.database().ref().push({ name: section });
  }

  render() {
    return (
      <form onSubmit={this.addSection.bind(this)}>
        <TextField name='section' floatingLabelText='Add New Section' onChange={this.handleChange.bind(this)}
          value={this.state.section} />
        <FloatingActionButton  type='submit'>
          <ContentAdd />
        </FloatingActionButton>
      </form>
    );
  }
}

AddSection.propTypes = {
  floatingLabelText: PropTypes.string
}

AddSection.contextTypes = {
  router: PropTypes.object
}

export default AddSection;
