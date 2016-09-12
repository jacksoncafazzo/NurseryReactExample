import React, { Component, Children } from 'react';

class AddFlowerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: {},
      section: null,
      genus: null,
      variety: null,
      commonName: null,
      commonDescription: null,
    }
  }

  componentWillMount() {
    this.inputs = {}; // We create a map of traversed inputs
    this.registerInputs(this.props.children); // We register inputs from the children
  }

  registerInputs(children) {
    // A React helper for traversing children
    Children.forEach(children, function (child) {

      // We do a simple check for "name" on the child, which indicates it is an input.
      // You might consider doing a better check though
      if (child.props.name) {

        // We attach a method for the input to register itself to the form
        child.props.attachToForm = this.attachToForm;

        child.props.detachFromForm = this.detachFromForm;
      }

      if (child.props.children) {
        this.registerInputs(child.props.children);
      }
    }.bind(this));
  }

  attachToForm(component) {
    this.inputs[component.props.name] = component;

    this.model[component.props.name] = component.state.value;
  }

  detachFromForm(component) {
    delete this.inputs[component.props.name];
    delete this.model[component.props.name];
  }

  updateModel(component) {
    Object.keys(this.inputs).forEach(function (name) {
      this.model[name] = this.inputs[name].state.value;
    }.bind(this));
  }

  handleSubmit(event) {
    event.preventDefault();
    this.updateModel();
    console.log(this.model);
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        {this.props.children}
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default AddFlowerForm;
