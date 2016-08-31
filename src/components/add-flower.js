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

  componentWillMount() {
    //const ref = firebase.database().ref();
    console.log('props', this.props)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    let flower = this.state;
    console.log('state flower', flower);
    const ref = firebase.database().ref('premiums');
    const storageRef = firebase.storage().ref();
    storageRef.child(flower.img).getDownloadURL()
      .then(url => {
        flower.img = url;
        console.log('premium: ', flower);
        ref.push(flower)
          .then(this.context.router.push('/'));
      });
  }

  render() {
    return (
      <div className='add-flowers'>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <TextField name='variety' floatingLabelText='Variety' onChange={this.handleChange.bind(this)}
            value={this.state.variety}/>
          </div>
          <div>
            <TextField name='commonName' floatingLabelText='Common Name' type='text' onChange={this.handleChange.bind(this)}
              value={this.state.commonName}/>
          </div>
          <div>
            <TextField name='priceSmall' floatingLabelText='Small Pot Price' type='number' onChange={this.handleChange.bind(this)}
              value={this.state.priceSmall}/>
          </div>
          <div>
            <TextField name='priceLarge' floatingLabelText='Medium Pot Price' type='number' onChange={this.handleChange.bind(this)}
              value={this.state.priceLarge}/>
           </div>
           <div>
             <TextField name='img' floatingLabelText='ImageSource' onChange={this.handleChange.bind(this)}
               value={this.state.img}/>
            </div>
          <div>
              <TextField name='instructions'
              floatingLabelText='Growing Instructions' onChange={this.handleChange.bind(this)}
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
  floatingLabelText: PropTypes.string
}

AddFlower.contextTypes = {
  router: PropTypes.string
}

export default AddFlower;
