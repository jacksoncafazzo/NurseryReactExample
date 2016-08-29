import React, { Component, PropTypes } from 'react';
import firebase from 'firebase';
import TextField from 'material-ui/TextField';

class AddFlower extends Component {
  constructor(props) {
    super(props);
    this.state =
      {
        variety: '',
        commonName: '',
        priceSmall: '',
        priceLarge: '',
        img: '',
        instructions: ''
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
    const ref = firebase.database().ref('premiums');
    const storageRef = firebase.storage().ref();
    storageRef.child(flower.img).getDownloadURL()
      .then(url => {
        flower.img = url;
        console.log('premium: ', flower);
        ref.push(flower)
          .then(() => {
            this.context.router.push('/');
          });
      });
  }

  render() {

    return (
      <div className='add-flowers'>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <label>Variety</label>
            <TextField name='variety' hint='Variety' onChange={this.handleChange.bind(this)}
            value={this.state.variety}/>
          </div>
          <div>
            <label>Common Name</label>
            <TextField name='commonName' hint='Common Name' type='text' onChange={this.handleChange.bind(this)}
              value={this.state.commonName}/>
          </div>
          <div>
            <label>Small Pot Price</label>
            <TextField name='priceSmall' hint='Small Pot Price' type='number' onChange={this.handleChange.bind(this)}
              value={this.state.priceSmall}/>
          </div>
          <div>
            <label>Medium Pot Price</label>
            <TextField name='priceLarge' hint='Medium Pot Price' type='number' onChange={this.handleChange.bind(this)}
              value={this.state.priceLarge}/>
           </div>
           <div>
             <label>Image Source</label>
             <TextField name='img' hint='ImageSource' onChange={this.handleChange.bind(this)}
               value={this.state.img}/>
            </div>
          <div>
              <label>Instructions</label>
              <TextField name='instructions'
              hint='Growing Instructions' onChange={this.handleChange.bind(this)}
                value={this.state.instructions}/>
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

AddFlower.propTypes = {
  hint: PropTypes.string
}

export default AddFlower;
