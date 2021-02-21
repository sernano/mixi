import React from 'react';
import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import {DragDrop} from '@uppy/react';
import {Modal, Button} from 'react-bootstrap';

class UploadSongs extends React.Component {
  constructor(props) {
    super(props);
    this.uppy = new Uppy({
      restrictions: {maxNumberOfFiles: 20},
      allowedFileTypes: ['.mp3'],
      autoProceed: false
    });
    this.handleUpload = this.handleUpload.bind(this);
  }

  async handleUpload() {
    await this.uppy.upload();
    this.props.closeUpload();
  }

  componentDidMount() {
    this.uppy.use(XHRUpload, {
      endpoint: '/api/songs/',
      method: 'post',
      formData: true
    });
  }

  componentWillUnmount() {
    this.uppy.close();
  }

  render() {
    return (
      <Modal show={this.props.showUpload} onHide={this.props.closeUpload}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Songs</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DragDrop
            className="justify-content-center"
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
          <Button
            variant="primary"
            onClick={this.handleUpload}
            className="btn-block mt-4"
          >
            Upload
          </Button>
        </Modal.Body>
      </Modal>
    );
  }
}

export default UploadSongs;
