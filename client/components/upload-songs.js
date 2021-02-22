import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import {DragDrop} from '@uppy/react';
import {Modal, Button} from 'react-bootstrap';

export default function UploadSongs(props) {
  const history = useHistory();

  // Initialize Uppy
  const uppy = new Uppy({
    restrictions: {maxNumberOfFiles: 20},
    allowedFileTypes: ['.mp3'],
    autoProceed: false
  });

  useEffect(() => {
    uppy.use(XHRUpload, {
      endpoint: '/api/songs/',
      method: 'post',
      formData: true
    });
    return () => {
      uppy.close();
    };
  });

  const handleUpload = async () => {
    await uppy.upload();
    history.push('/my-tapes');
    props.closeUpload();
  };

  return (
    <Modal show={props.showUpload} onHide={props.closeUpload}>
      <Modal.Header closeButton>
        <Modal.Title>Upload Songs</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <DragDrop
          className="justify-content-center"
          width="100%"
          height="100%"
          note=".mp3s only, plz"
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
        <Button
          variant="primary"
          onClick={handleUpload}
          className="btn-block mt-4"
        >
          Upload
        </Button>
      </Modal.Body>
    </Modal>
  );
}
