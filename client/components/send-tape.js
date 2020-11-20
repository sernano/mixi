import React from 'react';
import Uppy from '@uppy/core';
import ThumbnailGenerator from '@uppy/thumbnail-generator';
import XHRUpload from '@uppy/xhr-upload';

import {DragDrop} from '@uppy/react';

class SendTape extends React.Component {
  constructor(props) {
    super(props);
    this.uppy = new Uppy({
      restrictions: {maxNumberOfFiles: 20, maxFileSize: 10485760},
      allowedFileTypes: ['.mp3', ',m4a'],
      autoProceed: false
    });

    this.state = {
      filesToUpload: []
    };
  }

  componentDidMount() {
    this.uppy.use(XHRUpload, {
      endpoint: '/api/songs/upload',
      method: 'post',
      formData: true
    });
    this.uppy.on('file-added', file => {
      console.log('Added file', file);
      const fileAdded = this.uppy.getFiles();
      this.setState({
        filesToUpload: fileAdded
      });
      console.log('state:', this.state);
    });
  }
  render() {
    console.log('state:', this.state);
    return (
      <>
        <DragDrop
          width="70%"
          height="70%"
          note="Drop yer songs here"
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
        <br />
        <div>
          <button type="button" onClick={this.uppy.upload}>
            Upload
          </button>
        </div>
      </>
    );
  }
}

export default SendTape;
