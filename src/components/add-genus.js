import React, { Component, PropTypes } from 'react';
import firebase from 'firebase';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

class AddGenus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      section: props.section,
      genus: props.genus,
      instructions: ''
    }
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  addGenus(e) {
    e.preventDefault();
    let { genus, section } = this.state;
    firebase.database().ref(section).push({ name: genus, instructions: 'enter instructions' });
  }

  addInstructions(e) {
    e.preventDefault();
    let { genus, section, instructions } = this.state;
    console.log(section);
    //firebase.database().ref(`${section}/${genus}`).update({ instructions: instructions });
  }

  render() {
    return (
      <div>
      <form onSubmit={this.addGenus.bind(this)}>
        <TextField name='genus' floatingLabelText='Genus Name' onChange={this.handleChange.bind(this)} value={this.state.genus} />
        <FloatingActionButton type='submit'>
          <ContentAdd />
        </FloatingActionButton>
      </form>
      <form onSubmit={this.addInstructions.bind(this)}>
        <TextField name='instructions' floatingLabelText='Genus Description' onChange={this.handleChange.bind(this)}
        value={this.state.instructions} />
          <FloatingActionButton type='submit'>
            <ContentAdd />
          </FloatingActionButton>
      </form>
    </div>
    );
  }
}

AddGenus.propTypes = {
  floatingLabelText: PropTypes.string
}

AddGenus.contextTypes = {
  router: PropTypes.object
}

export default AddGenus;
