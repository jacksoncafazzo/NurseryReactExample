import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import firebase from 'firebase';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import {colors} from 'material-ui/styles';

const ref = firebase.database().ref('catalog');

class AddImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: null
    }
  }

  handleChange(event) {
    event.preventDefault();
    let img = event.target.files[0];
    this.setState({img: img})
  }

  uploadImageAndUpdate(img) {
    let { plant, varietyName } = this.props;
    // we need to make a reference to storage:
    const storageRef = firebase.storage().ref();

    // Create a reference to the file name and upload it
    //upload the file and get a task to monitor changes below
    let imageUploadTask = storageRef.child(`images/${img.name}`).put(img);

    imageUploadTask.on('state_changed', (snapshot) => {
      //get progress
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED:
          console.log('Upload paused');
          break;
        case firebase.storage.TaskState.RUNNING:
          console.log('Upload is running');
          break;
      }
    }, (error) => {
      console.log('unsuccessful upload', error.message);
    }, () => {
      //upload successful!
      //get downloadURL
      let downloadURL = imageUploadTask.snapshot.downloadURL;


      //get plant ref in database
      //ref is 'catalog'
      ref.orderByChild('Variety').startAt(varietyName).endAt(varietyName).once('value', (snapshot) => {
        let plants = snapshot.val();
        if (plants) {
          //snapshot is not null
          console.log(plants, imageUploadTask.snapshot)
          Object.keys(plants).map((key) => {
            //update object in database
            ref.child(key).update({ img: downloadURL });
          });

          console.log('you uploaded the file!', plant);
        } else {
          // query for variety failed, search for Variety 2
          ref.orderByChild('Variety 2').startAt(varietyName).endAt(varietyName).once('value', (snapshot) => {
            let plants = snapshot.val();
            if (!plants) {
              console.log('i dont know what u did, man, but it aint working');
            } else {
              Object.keys(plants).map((key) => {
                plant['img'] = downloadURL;
              });
            }
          });
          // other query ends
        }
      });
      //first query ends
    });

    // remember that while the file names are the same, the references point to different files

  }

  addImage(e) {
    e.preventDefault();
    console.log('adding: ', e.target.img.files[0]);
    this.uploadImageAndUpdate(e.target.img.files[0]);
  }

  render() {
    let styles = {
      button: {
        color: 'white',
        background: [
        `linear-gradient(${colors.yello500}, ${colors.red900}, ${colors.amber500})`
        ,
        colors.lightGreen500
        ],
      }
    }

    return (
      <form onSubmit={this.addImage.bind(this)}>
        <input label={`Change image ${<ImageEdit />}`} type='file' accept='*.png' id='img' onChange={this.handleChange.bind(this)} />
        <RaisedButton
          label='Change db entry'
          style={styles.button}
          type='submit'
          icon={<ImageEdit />}
          />
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

export default Radium(AddImage);
