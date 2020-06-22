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
        {/**stream form component is mounted here such that edit stream and this component share all the same UI but only change the form
        labels and button text, so, we make streamform a reusssbale component for the UI and only mount them in the parent components which represent the routes
        to render in our router/component architecture
        
        we pass an onSubmit prop callback that will basically pass this callback down as props to the stream form, and then when
        the button to create stream or edit stream in the other component is pressed (hence the action creators in each) it will do all the logic we wanted

        */}
        <StreamForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

//connect and reduxform functions are being used: new syntax of the export now!
export default connect (null, {createStream}) (StreamCreate);
