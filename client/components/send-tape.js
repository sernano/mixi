import React from 'react';

class SendTape extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}
  render() {
    return (
      <div>
        <input type="file" name="filefield" multiple="multiple" />
      </div>
    );
  }
}

export default SendTape;
