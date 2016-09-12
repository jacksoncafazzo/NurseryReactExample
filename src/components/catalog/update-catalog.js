import React, { Component } from 'react';
import tsv from 'node-tsv-json';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FileCloudUpload from 'material-ui/svg-icons/file/cloud-upload';
import FileInput from 'react-file-input';
import fs from 'fs';

export default class UpdateCatalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tsvFile: ''
    }
  }

  handleChange(e) {
    const tsvFile = e.target.files[0];

    const jsonFile = this.tsvToJson(tsvFile);

    this.setState({ plants: jsonFile });
  }

  handleSubmit(e) {
    e.preventDefault();

  }

  tsvToJson(input) {
    console.log(input)
    tsv({
      input: input.name,
      output: null,
      parseRows: true
    }, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    });

  }

  render() {
    return (
      <div>
        <h2>Upload a tsv file to convert to JSON</h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input name='tsvFile'
            type='file'
            placeholder='browse' onChange={this.handleChange.bind(this)}
            value={this.state.tsvtsvFile} />
            <FloatingActionButton type='submit'>
              <FileCloudUpload />
            </FloatingActionButton>
        </form>
      </div>
    );
  }
}
