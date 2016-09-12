import React, { Component, PropTypes } from 'react';
import firebase from 'firebase';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

class AddVariety extends Component {
  constructor(props) {
    super(props);
    this.state = {
      section: props.section,
      genus: props.genus,
      commonName: props.commonName,
      variety: '',
    }
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  addVariety(e) {
    e.preventDefault();
    let { genus, section, commonName, variety } = this.state;
    firebase.database().ref(`${section}/${genus}/${commonName}`).push({ name: variety });
  }

  render() {
    return (
      <form onSubmit={this.addVariety.bind(this)}>
        <TextField name='variety' floatingLabelText='Add a Variety' onChange={this.handleChange.bind(this)} value={this.state.variety}
        />
        <FloatingActionButton  type='submit'>
          <ContentAdd />
        </FloatingActionButton>
      </form>
    );
  }
}

AddVariety.propTypes = {
  floatingLabelText: PropTypes.string
}

AddVariety.contextTypes = {
  router: PropTypes.object
}

export default AddVariety;
