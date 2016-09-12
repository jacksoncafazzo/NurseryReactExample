import React, { Component } from 'react';
import firebase from 'firebase';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

export default class AddCommonImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      section: props.section,
      genus: props.genus,
      instructions: ''
    }
  }

  addInstructions(e) {
    e.preventDefault();
    let { section, genus, instructions } = this.state;
    console.log(instructions);
    firebase.database().ref(`${section}/${genus}`).update({ instructions: instructions });
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
    return (
        <Card className='add-flower-cards'>
          <CardHeader title='General genus description' />
          <CardText>The genus requires a common name and instructions</CardText>
          <form onSubmit={this.addInstructions.bind(this)}>
          <TextField name='instructions' hintText='Plant Description, grow tips' onChange={this.handleChange.bind(this)}
            value={this.state.instructions} />
          <FloatingActionButton type='submit'>
            <ContentAdd />
          </FloatingActionButton>
        </form>
        </Card>
    );
  }
}
