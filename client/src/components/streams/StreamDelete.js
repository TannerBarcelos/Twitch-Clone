import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import history from '../../history'; //for the auto routing capabilities [see history file and also the code/explanation of this is the course]

// modal import -> see component main dir: we have a component there for a reactdom portal to create a modal. we hook it up to a div in the html file
// and then we bring it in here to actually render it
import Modal from '../Modal';

// actions : fetching ONE stream
import {fetchStream, deleteStream} from '../../actions';

// this component appears at /streams/delete based off our routing rules for component routes/linkage
class StreamDelete extends Component {
  componentDidMount () {
    //get the id from the route and send that data to the fetchStream action to make a request to our backend 'db' and fetch the stream by its ID
    this.props.fetchStream (this.props.match.params.id);
  }

  // cancel/delete button JSX code
  renderActions () {
    const id = this.props.match.params.id;

    return (
      <React.Fragment>
        <button
          className="ui button negative"
          onClick={() => {
            //use the delete stream action creator and pass it the stream id to delete
            this.props.deleteStream (id);
          }}
        >
          Delete
        </button>
        <Link to="/" className="ui button">Cancel</Link>
        {/**jsut send the user back to root if they press cancel: no need to make this a button: the semantic ui styling will mimic it as a button */}
      </React.Fragment>
    );
  }

  // Content for the modal: will show the if string until the fetch to the backend returns the stream name
  renderContent () {
    if (!this.props.stream) {
      return 'Are you sure you want to delete this stream?';
    }
    return `Are you sure you want to delete the stream : ${this.props.stream.title}`;
  }

  render () {
    return (
      // modal itself is wrapped in a portal in the compoentn so we can just return the component itself
      (
        <Modal
          title={'Delete Stream'}
          content={this.renderContent ()}
          actions={this.renderActions ()} //pass down the action buttons as props
          onDismiss={() => history.push ('/')} //will re-route the user back to the root route if they click outside the modal itself
        />
      )
    );
  }
}

// state is redux state and pureProps is just the natural usual props this component receives
const mapStateToProps = (state, pureProps) => {
  return {
    stream: state.streams[pureProps.match.params.id], // get the specific id of the stream by indexing the object because the key === streams id
  };
};

export default connect (mapStateToProps, {fetchStream, deleteStream}) (
  StreamDelete
);
