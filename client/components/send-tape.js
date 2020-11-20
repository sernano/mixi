import React from 'react';
import Uppy from '@uppy/core';
import ThumbnailGenerator from '@uppy/thumbnail-generator';
import XHRUpload from '@uppy/xhr-upload';
import Tus from '@uppy/tus';

import {DragDrop} from '@uppy/react';

const uppy = new Uppy({
  restrictions: {maxNumberOfFiles: 20, maxFileSize: 10485760},
  allowedFileTypes: ['.mp3', ',m4a'],
  autoProceed: false
});

uppy.use(XHRUpload, {
  endpoint: '/api/songs/upload',
  method: 'post',
  formData: true
});

class SendTape extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}
  render() {
    return (
      <>
        <DragDrop
          width="70%"
          height="70%"
          note="Drop yer songs here"
          uppy={uppy}
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
          <button type="button" onClick={uppy.upload}>
            Upload
          </button>
        </div>
      </>
    );
  }
}

export default SendTape;
