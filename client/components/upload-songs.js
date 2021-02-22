import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import {DragDrop} from '@uppy/react';
import {Modal} from 'react-bootstrap';

export default function UploadSongs(props) {
  const history = useHistory();

  // Initialize Uppy
  const uppy = new Uppy({
    restrictions: {maxNumberOfFiles: 20},
    allowedFileTypes: ['.mp3'],
    autoProceed: true
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

  const onUploadComplete = () => {
    history.push('/my-tapes');
    props.closeUpload();
  };

  uppy.on('complete', onUploadComplete);

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
          note=".mp3s only"
          uppy={uppy}
          locale={{
            strings: {
              // Text to show on the droppable area.
              // `%{browse}` is replaced with a link that opens the system file selection dialog.
              dropHereOr: 'Drop here or click to %{browse}',
              // Used as the label for the link that opens the system file selection dialog.
              browse: 'browse'
            }
          }}
        />
      </Modal.Body>
    </Modal>
  );
}
