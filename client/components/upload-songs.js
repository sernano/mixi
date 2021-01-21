import React from 'react';
import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';

import {DragDrop} from '@uppy/react';

class UploadSongs extends React.Component {
  constructor(props) {
    super(props);
    this.uppy = new Uppy({
      restrictions: {maxNumberOfFiles: 20},
      allowedFileTypes: ['.mp3'],
      autoProceed: false
    });
    this.state = {
      filesToUpload: []
    };
    this.handleUpload = this.handleUpload.bind(this);
  }

  async handleUpload() {
    await this.uppy.upload();
    this.props.history.push(`/my-tapes`);
  }

  componentDidMount() {
    this.uppy.use(XHRUpload, {
      endpoint: '/api/songs/',
      method: 'post',
      formData: true
    });
    this.uppy.on('file-added', () => {
      this.setState({
        filesToUpload: this.uppy.getFiles()
      });
    });
  }

  componentWillUnmount() {
    this.uppy.close();
  }

  render() {
    return (
      <>
        <h2>Upload Songs</h2>
        <div className="split-container">
          <div id="uppy-component">
            <DragDrop
              width="100%"
              height="100%"
              note=".mp3s only, plz"
              uppy={this.uppy}
              locale={{
                strings: {
                  // Text to show on the droppable area.
                  // `%{browse}` is replaced with a link that opens the system file selection dialog.
                  dropHereOr: 'Drop here or %{browse}',
                  // Used as the label for the link that opens the system file selection dialog.
                  browse: 'browse'
                }
              }}
            />
          </div>
          <div id="songs-to-upload">
            <h3>Files selected:</h3>
            {this.state.filesToUpload.map(file => {
              return (
                <div key={file.size}>
                  <h4>{file.name}</h4>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <button type="button" className="button" onClick={this.handleUpload}>
            Upload
          </button>
        </div>
      </>
    );
  }
}

export default UploadSongs;
