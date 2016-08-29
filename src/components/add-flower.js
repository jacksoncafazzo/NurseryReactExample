import React, { Component, PropTypes, createElement } from 'react';
import firebase from 'firebase';

class AddFlower extends Component {
  constructor(props) {
    super(props);
    this.state =
      {
        variety: '',
        commonName: '',
        priceSmall: 0,
        priceLarge: 0
      }
  }

  handleChange(event) {
    console.log({[event.target.name]: event.target.value})
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    let flower = this.state;
    console.log(flower);
    const ref = firebase.database().ref('flowers');
    ref.push(flower)
    .then(() => {
      this.context.router.push('/');
    });
  }

  render() {

    return (
      <div className='add-flowers'>
        <form className='form-horizontal' onSubmit={this.handleSubmit.bind(this)}>
          <div className='form-group col-sm-4'>
            <label>Variety</label>
            <input name='variety' className='form-control' type='text' onChange={this.handleChange.bind(this)}
              value={this.state.variety}/>
          </div>
          <div className='form-group  col-sm-4'>
            <label>Common Name</label>
            <input name='commonName' className='form-control' type='text' onChange={this.handleChange.bind(this)}
              value={this.state.commonName}/>
          </div>
          <div className='form-group  col-sm-4'>
            <label>Small Pot Price</label>
            <input name='priceSmall' className='form-control' type='number' onChange={this.handleChange.bind(this)}
              value={this.state.priceSmall}/>
          </div>
          <div className='form-group  col-sm-4'>
            <label>Medium Pot Price</label>
            <input name='priceLarge' className='form-control' type='number' onChange={this.handleChange.bind(this)}
              value={this.state.priceLarge}/>
           </div>
           <div className='form-group'>
           <button type='submit' className='form-control'>
             Add
           </button>
           </div>
        </form>
      </div>
    )
  }
}

// AddFlower.propTypes = {
//   value: React.PropTypes.object.isRequired,
//   onChange: React.PropTypes.func.isRequired,
// }

export default AddFlower;
