import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import firebase from 'firebase';

import RaisedButton from 'material-ui/RaisedButton';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import {colors} from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';


class AddImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: null,
      imageName: '',
      completed: 0,
      message: ''
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleChange(event) {
    event.preventDefault();
    let img = event.target.files[0];
    this.setState({img: img})
  }

  uploadImageAndUpdate(img) {
    let { refString } = this.props;
    const metadata = {
      'contentType': img.type
    };
    // we need to make a reference to storage:
    const storageRef = firebase.storage().ref();
    const plantsRef = firebase.database().ref(refString);
    // const catalogRef = firebase.database().ref('catalog');
    // Create a reference to the file name and upload it
    //upload the file and get a task to monitor changes below
    let uploadTask = storageRef.child(`images/${img.name}`).put(img, metadata)

    uploadTask.on('state_changed', (snapshot) => {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED:
          this.setState({ message: 'Upload paused'});
        break;
        case firebase.storage.TaskState.RUNNING:
          console.log('Upload is ' + progress + '% done');
          this.setState({ message: 'Upload is running'});
          this.setState({ completed: progress });
        break;
      }
    }, (error) => {
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
        break;
        case 'storage/canceled':
        // User canceled the upload
        break;
        default:
          return this.setState({ message: 'unauthorized' + error.message})
      }
    }, () => {
      this.setState({ message: ''});
      let downloadURL = uploadTask.snapshot.downloadURL;
      plantsRef.update({ img: downloadURL }).then(() => {
        console.log('Plant updated ' + downloadURL);
      });
    });
  }

  addImage(e) {
    e.preventDefault();
    if (e.target.img.files !== null) {
      console.log('adding: ', e.target.img.files[0]);
      this.uploadImageAndUpdate(e.target.img.files[0]);
    } else {
      this.updatePlantImageName(e.target.imageName.value);
    }
  }

  editImageName(e) {
    e.preventDefault();
    let imageName = e.target.imageName.value
    let { refString } = this.props;
    let plantsRef = firebase.database().ref(refString);
    plantsRef.update({ img: imageName }).then(() => {
      this.setState({ message: 'Name changed!'});
    }).catch((error) => {
      this.setState({ message: 'failure: ' + error.message});
    });
  }

  handleTextFieldChange(event) {
    this.setState({ imageName: event.target.value });
  }



  render() {
    let styles = {
      form: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'space-between',
        alignItems: 'center'
      },
      button: {
        color: 'white',
        background: [
        `linear-gradient(${colors.yello500}, ${colors.red900}, ${colors.amber500})`
        ,
        colors.lightGreen500
        ]
      }
    }
    let { completed } = this.state;
    return (
      <div>
        <form onSubmit={this.editImageName.bind(this)} style={styles.form}>
          <TextField floatingLabelText='Enter an existing image name, or add a file'
          name='imageName' value={this.state.imageName} onChange={this.handleTextFieldChange.bind(this)} />
          <RaisedButton
            label='Change db entry'
            style={styles.button}
            type='submit'
            icon={<ImageEdit />}
            secondary={true}
            />
      </form>
      <form onSubmit={this.addImage.bind(this)} style={styles.form}>
        <input label={`Change image ${<ImageEdit />}`} type='file' accept='*.png' id='img' onChange={this.handleChange.bind(this)} />
        <div>{this.state.message}{(completed > 0) ? <CircularProgress mode="determinate" value={this.state.completed} color={colors.green500}/> : null}</div>

        <RaisedButton
          label='Upload new image'
          style={styles.button}
          type='submit'
          
          />
      </form>
    </div>
    );
  }
}

AddImage.propTypes = {
  floatingLabelText: PropTypes.string
}

AddImage.contextTypes = {
  router: PropTypes.object
}

export default Radium(AddImage);
