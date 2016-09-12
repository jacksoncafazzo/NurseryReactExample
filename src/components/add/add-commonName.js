import React, { Component, PropTypes } from 'react';
import firebase from 'firebase';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

class AddCommonName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      section: props.section,
      genus: props.genus,
      commonName: '',
    }
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  addCommonName(e) {
    e.preventDefault();
    let { genus, section, commonName } = this.state;
    firebase.database().ref(`${section}/${genus}`).push({ name: commonName });
  }

  render() {
    return (
      <form onSubmit={this.addCommonName.bind(this)}>
        <TextField name='commonName' floatingLabelText='Add a Common Name' onChange={this.handleChange.bind(this)} value={this.state.commonName}
        />
        <FloatingActionButton  type='submit'>
          <ContentAdd />
        </FloatingActionButton>
      </form>
    );
  }
}

AddCommonName.propTypes = {
  floatingLabelText: PropTypes.string
}

AddCommonName.contextTypes = {
  router: PropTypes.object
}

export default AddCommonName;
