import React, { Component, PropTypes } from 'react';
import firebase from 'firebase';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import AddSection from './add-section.js';
import AddGenus from './add-genus';
import AddCommonName from './add-commonName';
import AddVariety from './add-variety';
import AddInstructions from './add-instructions';
import AddImage from './add-image';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Chip from 'material-ui/Chip';

import {Card, CardHeader, CardText, CardActions, CardMedia } from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';

class AddFlower extends Component {
  constructor(props) {
    super(props);
    this.state = {
      section: null,
      genus: null,
      variety: null,
      commonName: null,
      commonDescription: null,
      showGenus: false,
      showCommon: false,
      showCommonImage: false,
      showVariety: false,
      expanded: false,
      genusExpanded: false,
      img: null,
      instructions: null,
      sections: {},
      plant: {},
      plantKeys: [],
      plantChips: [],
      error: {},

    }

    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentWillMount() {
    firebase.database().ref().on('value', this.handleUpdate);
  }

  componentWillReceiveProps() {
    //let { section, genus, instructions, commonName, img } = this.state;

  }

  componentWillUnmount() {
    firebase.database().ref().off('value', this.handleUpdate);
  }

  handleUpdate(dataModel) {
    this.setState({ sections: dataModel.val()});
    console.log('listener updated the state', dataModel.val());
  }

  handleChange(e,i,v) {
    this.setState({[e.target.name]: v});
  }

  handleSectionChange(e, i, v) {
    let { sections, plantKeys, plantChips } = this.state;
    let plant = sections[v];
    console.log('its a plant', plant);
    plantChips.push([
      {key:0, label:v}
    ]);
    plantKeys.push(v);
    this.setState({
      plant: plant,
      plantChips: plantChips,
      plantKeys: plantKeys,
      section: v,
      showGenus: true
    });
  }

  handleGenusChange(e, i, v) {
    let { plantChips, sections, plantKeys} = this.state;
    let plant = sections[plantKeys[0]][v];
    plantChips.push({key:1, label:v});
    plantKeys.push(v);
    this.setState({
      plant: plant,
      plantKeys: plantKeys,
      plantChips: plantChips,
      genus: v,
      showCommon: true
    });
  }

  handleCommonNameChange(e, i, v) {
    let {sections, plantChips, plantKeys} = this.state;
    let plant = sections[plantKeys[0]][plantKeys[1]][v];
    plantChips.push({key:2, label:v});
    plantKeys.push(v);
    console.log('u got plant', plant);
    this.setState({
      plant: plant,
      plantChips: plantChips,
      plantKeys: plantKeys,
      commonName: v,
      showVariety: true
    });
  }

  handleVarietyChange(e, i, v) {
    let {sections, plantChips, plantKeys} = this.state;
    let plant = sections[plantKeys[0]][plantKeys[1]][plantKeys[2]][v];
    plantChips.push({key:2, label:v});
    plantKeys.push(v);
    this.setState({ variety: v });
  }

  handleToggle(event, toggle) {
    let section = this.state.section;
    this.setState({ section: this.state.sections[section].name, expanded: toggle });
  };

  handleGenusToggle(event, toggle) {
    let { genus, section } = this.state;
    this.setState({ genus: this.state.sections[section][genus].name, genusExpanded: toggle});
  }

  handleExpandChange(expanded) {
   this.setState({expanded: expanded});
 }

 handleGenusExpandChange(genusExpanded){
   this.setState({ genusExpanded: genusExpanded });
 }

  addInstructions(e) {
    e.preventDefault();
    firebase.database().ref(`${this.state.section}/${this.state.genus}`).set({ instructions: this.state.instructions});
  }

  handleSubmit(e) {
    e.preventDefault();
    let { section, genus, img, instructions, commonName, commonDescription, variety, showGenus, showCommon, showVariety } = this.state;

    if (showGenus && !showCommon && genus && instructions) {
      firebase.database().ref(`${section}`).push({ name: genus, instructions: instructions })
    }
    if (showCommon && !showVariety && commonName) {
      firebase.database().ref(`${section}/${genus}`).push({ name: commonName }).then((commonRef)=> {
        (img && commonDescription) ?
        firebase.database().ref().child(img).getDownloadURL()
        .then(url => {
          img = url;
          commonRef.update({ img: img, commonDescription: commonDescription });
        }) : commonRef.update({ commonDescription: commonDescription});
      })
    }
    if (showVariety && variety) {
      firebase.database().ref(`${section}/${genus}/${commonName}`).push({ name: variety }).then((varietyRef) => {
      });
    }
  }

  handleRequestDelete() {
    console.log('you want to delete? thbbt.')
  }

  handleTouchTap() {
    console.log('you want tap? you tapped')
  }

  renderObjectChip(key) {
    if (key) {
      return (<Chip key={key}
        onRequestDelete={this.handleRequestDelete.bind(this)}
        onTouchTap={this.handleTouchTap.bind(this)}
        >
        {key}
      </Chip>)
    }
  }

  renderGenus() {
    return(
      <Card className='add-flower-cards' expanded={this.state.genusExpanded} onExpandChange={this.handleGenusExpandChange}>
          <CardHeader title='Next, select a Genus' />
          <SelectField
          name='genus'
          value={this.state.genus} onChange={this.handleGenusChange.bind(this)} maxHeight={200} hintText='choose an existing genus'>
          {this.renderMenuItems(this.state.sections[this.state.section])}
        </SelectField>
        <CardText><Toggle
            toggled={this.state.genusExpanded}
            onToggle={this.handleGenusToggle.bind(this)}
            labelPosition='right'
            label='Toggle to edit.'
          /></CardText>
        <CardText expandable={true}><TextField name='genus' onChange={this.handleChange.bind(this)}
          value={this.state.genus} floatingLabelText='edit the genus'/>}>
        </CardText>
      </Card>
    );
  }

  renderCommonName() {
    let { sections, section, genus } = this.state;
    if (null !== sections[section][genus]) {
      return (
      <Card>
      <CardHeader title='Choose a common name' />
          <SelectField
            name='commonName'
            value={this.state.commonName} onChange={this.handleCommonNameChange.bind(this)} maxHeight={200}>
            {this.renderMenuItems(sections[section][genus])}
          </SelectField>
        </Card>
      );
    }
  }

  renderVarieties() {
    let { sections, section, genus, commonName } = this.state;
    if (null !== sections[section][genus][commonName]) {
      return (
      <Card>
      <CardHeader title='Select a variety name' />
          <SelectField
            name='variety'
            value={this.state.variety} onChange={this.handleVarietyChange.bind(this)} maxHeight={200}>
            {this.renderMenuItems(sections[section][genus][commonName])}
          </SelectField>
        </Card>
      );
    }
  }

  renderMenuItems(items) {
    let resultArray = [];
    Object.keys(items).map((key, i) => {
      if (key !== 'name') {
        resultArray.push(<MenuItem value={key} key={i} primaryText={items[key].name} />);
      }
    });
    return resultArray;
  }

  renderPlant() {
    let { sections, plantChips, plantKeys, plant } = this.state;
    let args = plantKeys;
    let plantSection = null;
    let plantGenus = null;
    let plantCommon = null;
    if (!plant || plant.hasOwnProperty(args[0])) {
      console.log('no plant or failed download', args);
      return null
    } else {
    if (args.length > 0) {
      plantSection = sections[args[0]];

      if (sections[args[0]].hasOwnProperty(args[1]) && args.length > 1) {
        plantGenus = sections[args[0]][args[1]];

        if (sections[args[0]].hasOwnProperty(args[2]) && args.length > 2) {
          plantCommon = sections[args[0]][args[1]][args[2]];

        }
      }
    }
    return (
      <Card>
        {(!plantSection) ? null : <CardHeader title='Section currently editing' subtitle={plantSection.name} />}
        {(!plantGenus) ? null : <div>
          <CardText>Genus name: {plantGenus.name}</CardText>
          {(plantGenus.hasOwnProperty(instructions)) ? <CardText>Instructions: {plantGenus.instructions}</CardText> : null}
          </div>}
        {(!plantCommon) ? null : <div>{(!plantCommon.img) ? null :
          <CardMedia><img src={plantCommon.img} /></CardMedia>}
          <CardText>Common name: {plantCommon.name}</CardText>
        </div>}
      </Card>
    );
    }
  }

  render() {
    if (this.state !== null) {
      let { sections, section, genus, commonName, instructions, variety, plant } = this.state;
    return (
      <div className='add-flowers'>
        <Card className='add-flower-cards first'>
          <CardHeader title='Add items to the database' />
          <CardText>The database schema root has structure folders, i.e. premiums and annuals.</CardText>
          <CardText>You can add a new section below or choose an existing section from the list</CardText>
          <CardText>When you select from a list, the key is saved so you can add children to that location.</CardText>
        </Card>
        <form onSubmit={this.handleSubmit.bind(this)}>
        <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange} className='add-flower-cards'>
          <CardHeader title='Begin by choosing a section'/>
        <SelectField
          value={this.state.section} onChange={this.handleSectionChange.bind(this)} maxHeight={200} hintText='choose which section to add to'>
          {this.renderMenuItems(this.state.sections)}
        </SelectField>
        <CardText>
        <Toggle
            toggled={this.state.expanded}
            onToggle={this.handleToggle.bind(this)}
            labelPosition='right'
            label='Toggle to edit.'
          /></CardText>
        <CardText expandable={true} children={<TextField name='section' onChange={this.handleChange.bind(this)}
          value={this.state.section} hintText='edit the section'/>}>
        </CardText>
      </Card>
      {(!this.state.section || this.state.genus) ? null : this.renderGenus()}
      {(this.state.showCommon) ? this.renderCommonName(this.state.genus) : null}
      <Card>{(this.state.showVariety) ? this.renderVarieties(this.state.commonName) : null}</Card>

      </form>
      <Card className='add-sections'>
        <CardHeader title='Create an object to save:' />
        <Card>
          render plant
          <CardText>
          {(this.state.section) ? this.renderObjectChip(sections[section].name) : null}
          {(this.state.genus) ? this.renderObjectChip(sections[section][genus].name) : null}
          {(this.state.instructions) ? this.renderObjectChip(sections[section][genus].instructions) : null}
          {(this.state.commonName) ? this.renderObjectChip(sections[section][genus][commonName].name) : null}
          {(this.state.img) ? this.renderObjectChip(this.state.img) : null }
          {(this.state.variety) ? this.renderObjectChip('variety') : null}
          </CardText>
        </Card>
        {(this.state.showGenus || !this.showVariety && !this.state.showCommon ) ? null : <AddSection />}

        {(this.state.showGenus && !this.state.showCommon || !this.state.showVariety ) ? <AddGenus section={section} /> : null}

        {(this.state.showCommon && !this.state.showVariety) ? <div><div>Enter general genus description here</div><AddInstructions section={section} genus={genus} /><AddImage plantKeys={this.state.plantKeys} /><AddCommonName section={section} genus={genus} /></div> : null}

        {(this.state.showVariety) ? <div><AddImage plantKeys={this.state.plantKeys} /><AddVariety section={section} genus={genus} commonName={commonName} /></div> : null}

        <CardActions><RaisedButton type='submit' label='Save' onClick={this.handleSubmit.bind(this)} /></CardActions>
        </Card>
      </div>
    );
    } else {
      return (<div>Loading...</div>)
    }
  }
}

AddFlower.propTypes = {
  floatingLabelText: PropTypes.string
}

AddFlower.contextTypes = {
  router: PropTypes.object
}

export default AddFlower;
