import React from 'react';
import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import {DragDrop} from '@uppy/react';
import {Row, Col, ListGroup, ListGroupItem, Button} from 'react-bootstrap';

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
      <Row className="justify-content-center">
        <Col xs={12}>
          <h2 className="text-center mb-5">Upload Songs</h2>
        </Col>
        <Col md={6}>
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
        </Col>
        <Col md={6}>
          <h5 className="mb-4">Files selected:</h5>
          <ListGroup>
            {this.state.filesToUpload.map(file => {
              return (
                <ListGroupItem key={file.size}>
                  <h6>{file.name}</h6>
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </Col>
      </Row>
    );
  }
}

export default UploadSongs;
