import React, {Component} from 'react';
import {connect} from 'react-redux'; //needed to map state as props from the store as we know [we already use reduxForm which does kinda the same thing for form state... see how we go about this below :)]
import {createStream} from '../../actions'; //create stream action creator
import StreamForm from './StreamForm';

class StreamCreate extends Component {
  onSubmit = formValues => {
    this.props.createStream (formValues);
  };

  render () {
    return (
      <div>
        <h3>Create a Stream</h3>
        <StreamForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

//connect and reduxform functions are being used: new syntax of the export now!
export default connect (null, {createStream}) (StreamCreate);
