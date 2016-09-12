import React, { Component, PropTypes } from 'react';
import firebase from 'firebase';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

class AddImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: ''
    }
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  addImage(e) {
    e.preventDefault();
    let { plantKeys } = this.props;

    let refString = '';
    if (plantKeys.length > 0) {
      refString += plantKeys[0];
      if (plantKeys.length > 1) {
        refString += `/${plantKeys[1]}`;
        if (plantKeys.length > 2) {
          refString += `/${plantKeys[2]}`;
          if (plantKeys.length > 3) {
            refString += `/${plantKeys[3]}`;
          }
        }
      }
    }
    console.log('refString', refString);


    firebase.storage().ref().child(this.state.img).getDownloadURL()
      .then(url => {
         firebase.database().ref(refString).update({ img: url });
      });
    this.setState({ showCommonImage: true });
  }

  render() {
    return (
      <form onSubmit={this.addImage.bind(this)}>
        <TextField name='img' floatingLabelText='Image name on firebase' onChange={this.handleChange.bind(this)} value={this.state.img} />
        <FloatingActionButton type='submit'>
          <ContentAdd />
        </FloatingActionButton>
      </form>
    );
  }
}

AddImage.propTypes = {
  floatingLabelText: PropTypes.string
}

AddImage.contextTypes = {
  router: PropTypes.object
}

export default AddImage;
