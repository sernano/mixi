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
        <DragDrop
          width="70%"
          height="70%"
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
        <br />
        <div>
          {this.state.filesToUpload.map(file => {
            return <div key={file.size}>{file.name}</div>;
          })}
          <button type="button" onClick={this.uppy.upload}>
            Upload
          </button>
        </div>
      </>
    );
  }
}

export default UploadSongs;
