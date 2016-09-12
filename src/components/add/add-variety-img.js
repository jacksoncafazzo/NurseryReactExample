import React, { Component } from 'react';

export default class CatalogVariety extends Component {
  render() {
    return(
      <Card className='add-flower-cards'>
        <TextField name='img' floatingLabelText='Image Source' onChange={this.handleChange.bind(this)}
          value={this.state.img}/>
        <SelectField
          name='varieties'
          value={this.state.variety} onChange={this.handleVarietyChange.bind(this)} maxHeight={200}>
          {Object.keys(this.state.sections[this.state.section][this.state.genus][this.state.commonName]).map((key, i) => {
            let showValue = true;
            if (key === 'name') {
              showValue = false;
            }
            if (showValue) {
              return (<MenuItem value={key} key={i} primaryText={this.state.sections[this.state.section][this.state.genus][this.state.commonName][key].name} />)
            } else {
              return null
            }
          })}
        </SelectField>
      </Card>
  );
  }
}
