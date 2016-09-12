import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

export default class AddFlowerFormInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.value || ''
    }
  }

  componentWillMount() {
    this.props.attachToForm(this);
  }

  componentWillUnmount() {
    this.props.detachFromForm(this);
  }

  setValue({e,i,v}) {
    this.setState({ value: v})
  }

  render() {
    return (
      <div>
        <TextField name={this.props.name} floatingLabelText='Genus Name' onChange={this.setValue.bind(this)} value={this.state.value} />
        <FloatingActionButton type='submit'>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}
