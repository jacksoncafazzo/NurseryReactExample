import React, { Component } from 'react';
import {WithFormValue} from 'react-forms';

class Field extends Component {
  render() {
    let {formValue} = this.props;
    console.log(formValue);
    return (
      <div>
        <label>{formValue.label}</label>
        <input value={formValue.value} onChange={this.onChange} />
      </div>
    );
  }
  onChange = (e) => this.props.formValue.update(e.target.value);
}

export default WithFormValue(Field);
