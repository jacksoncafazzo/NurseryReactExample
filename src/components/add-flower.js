import React, { Component, PropTypes } from 'react';
import firebase from 'firebase';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AddSection from './add-section.js';
import AddGenus from './add-genus';
import AddCommonName from './add-commonName';
import AddVariety from './add-variety';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Chip from 'material-ui/Chip';

class AddFlower extends Component {
  constructor(props) {
    super(props);
    this.state = {
      section: null,
      genus: null,
      variety: null,
      commonName: null,
      priceSmall: null,
      priceLarge: null,
      img: '',
      instructions: '',
      sections: {},
      genuses: {},
      commonNames: {},
      savedFlower: {}
    }
  }

  componentWillMount() {
    let self = this;
    firebase.database().ref().on('value', (snapshot) => {
      let sectionSnap = snapshot.val();
      self.setState({ sections: sectionSnap });
    });
      // Object.keys(sectionSnap).map((sectionKey, i) => {
      //   firebase.database().ref(sectionKey).on('value', (snapshot2) => {
      //     let sectionListenSnap = snapshot2.val();
      //     self.setState({ genuses: sectionListenSnap });
      //     if (sectionListenSnap.length > 0) {
      //       Object.keys(sectionListenSnap).map((key, i) => {
      //         console.log('commonName', sectionListenSnap[key]);
      //       })
      //     }
      //   });

        // firebase.database().ref(`${sectionKey}/${}`)
        // Object.keys(sectionSnap[sectionKey]).map((genusKey, i) => {
        //   console.log('genus section key', sectionSnap[sectionKey][genusKey]);
        //   if (genusKey !== 'name') {
        //     genuses.push({
        //       key: genusKey,
        //       name: sectionSnap[sectionKey][genusKey].name
        //     });
        //   }
        // });
      //self.setState({ sections: sections, genuses: genuses });
      // });

  }

  componentWillUpdate() {
    // let self = this;
    // let section = this.state.section;
    // if (section !== null && this.state.sections.length > 0) {
    //   firebase.database().ref(section).on('value', (snapshot) => {
    //     let genuses = [];
    //     let genusSnap = snapshot.val();
    //     Object.keys(genusSnap).map((key, i) => {
    //       genuses.push({ key: key, name: genusSnap[key].name});
    //     });
    //     self.setState({ genuses: genuses});
    //   });
    // }
    // let genus = this.state.genus
    // if (genus !== null && this.state.genuses.length > 0) {
    //   let genus = this.state.genus;
    //   if (genus !== null) {
    //     firebase.database().ref(`${section}/${genus}`).on('value', (snapshot) => {
    //       let commonNames = [];
    //       let commonNameSnap = snapshot.val();
    //       Object.keys(commonNameSnap).map((key, i) => {
    //         commonNames.push({ key: key, name: commonNameSnap[key].name});
    //       });
    //       self.setState({ commonNames: commonNames });
    //     });
    //   }
    // }
  }



  handleChange(e,i,v) {
    this.setState({[e.target.name]: v});
  }

  handleSectionChange(e, i, v) {
    this.setState({ section: v });

  }

  handleGenusChange(e, i, v) {
    this.setState({ genus: v });
  }

  handleCommonNameChange(e, i, v) {
    this.setState({ variety: v });
  }

  handleVarietyChange(e, i, v) {
    this.setState({ variety: v });
  }

  addInstructions(e) {
    e.preventDefault();
    firebase.database().ref(`${this.state.section}/${this.state.genus}`).set({ instructions: this.state.instructions});
  }

  // handleSubmit(e) {
  //   e.preventDefault();
  //   let flower = this.state;
  //   const ref = firebase.database().ref('premiums');
  //   firebase.storage().ref().child(flower.img).getDownloadURL()
  //     .then(url => {
  //       flower.img = url;
  //       console.log('premium: ', flower);
  //       ref.set({
  //         [flower.genus]: {}})
  //         .then(() => {
  //
  //           this.context.router.push('/');
  //         });
  //     });
  // }

  handleRequestDelete() {
    console.log('you want to delete? thbbt.')
  }

  handleTouchTap() {
    console.log('you want tap? you tapped')
  }

  renderObjectChip(text) {
    if (text) {
      return (<Chip key={text + Math.random()}
        onRequestDelete={this.handleRequestDelete.bind(this)}
        onTouchTap={this.handleTouchTap.bind(this)}
        >
        {text}
      </Chip>)
    }
  }

  renderGenus(section) {
    if (section) {
      return (
        <div>
          <SelectField
            name='genus'
            value={this.state.genus} onChange={this.handleGenusChange.bind(this)} maxHeight={200}>
            {Object.keys(this.state.sections[this.state.section]).map((key, i) => {
              let showValue = true;
              if (key === 'name') {
                showValue = false;
              }
              if (showValue) {
                return (<MenuItem value={key} key={i} primaryText={this.state.sections[this.state.section][key].name} />)
              } else {
                return <div key={`blank${i}`}></div>
              }
            })}
          </SelectField>
          <AddGenus section={this.state.section} genus={this.state.sections[this.state.genus]}/>
        </div>
      );
    }
  }


  renderCommonName(genus) {
    if (genus) {
      return (
        <div>
          <SelectField
            name='commonName'
            value={this.state.commonName} onChange={this.handleCommonNameChange.bind(this)} maxHeight={200}>
            {Object.keys(this.state.sections[this.state.section][this.state.genus]).map((key, i) => {
              let showValue = true;
              if (key === 'name') {
                showValue = false;
              }
              if (showValue) {
                return (<MenuItem value={key} key={i} primaryText={this.state.sections[this.state.section][this.state.genus][key].name} />)
              } else {
                return <div key={`blanks${i}`}></div>
              }
            })}
          </SelectField>
          <AddCommonName section={this.state.section} genus={this.state.genus} />
        </div>
      );
    }
  }

  renderVarieties() {
    return (
      <div>
        <SelectField
          name='varieties'
          value={this.state.variety} onChange={this.handleVarietyChange.bind(this)} maxHeight={200}>
          {Object.keys(this.state.varieties).map((key, i) => {
            let showValue = true;
            if (key === 'name') {
              showValue = false;
            }
            if (showValue) {
              return (<MenuItem value={key} key={i} primaryText={this.state.varieties[key].name} />)
            } else {
              return <div key={`blankie${i}`}></div>
            }
          })}
        </SelectField>
        <AddVariety section={this.state.section} genus={this.state.genus} />
      </div>
    );
  }

  render() {
    console.log('sections: ', this.state.sections);
    if (this.state !== null) {
    return (
      <div className='add-flowers'>
        <AddSection />
        <SelectField
          value={this.state.section} onChange={this.handleSectionChange.bind(this)} maxHeight={200} floatingLabelText='choose an existing section to modify'>
          {Object.keys(this.state.sections).map((key, i) => {
            let showValue = true;
            if (key === 'name') {
              showValue = false;
            }
            if (showValue) {
              return (<MenuItem value={key} key={i} primaryText={this.state.sections[key].name} />)
            } else {
              return <div key={`blan${i}`}></div>
            }
          })}
        </SelectField>
        <div>{this.renderObjectChip(this.state.section)}{this.renderObjectChip(this.state.genus)}{this.renderObjectChip(this.state.commonName)}</div>

        {(this.state.section !== null) ? this.renderGenus(this.state.section) : <div key='balch'></div>}
        {(this.state.genus !== null) ? this.renderCommonName(this.state.genus) : <div key='blech'></div>}

        {(this.state.commonName !== null) ? this.renderVarieties(this.state.genus) : <div key='bleck'></div>}

        <TextField name='img' floatingLabelText='Image Source' onChange={this.handleChange.bind(this)}
        value={this.state.img}/>

        <RaisedButton type='submit' label='Add' />

      </div>
    );
    } else {
      return (<div>Loading...</div>)
    }
  }
}

//{(this.state.genus !== null) ? this.renderVarieties(this.state.genus) : null}
AddFlower.propTypes = {
  floatingLabelText: PropTypes.string
}

AddFlower.contextTypes = {
  router: PropTypes.object
}

export default AddFlower;
