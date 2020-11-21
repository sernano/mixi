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
        <div id="upload-songs-container">
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
              return <div key={file.size}>{file.name}</div>;
            })}
          </div>
        </div>
        <div>
          <button type="button" onClick={this.uppy.upload}>
            Upload
          </button>
        </div>
      </>
    );
  }
}

export default UploadSongs;
