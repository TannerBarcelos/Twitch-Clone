import React, {Component} from 'react';

// react-redux/redux stuff
import {connect} from 'react-redux';

// actions: remember the actions are all exported from index.js in actions folder.. javascript is smart and always assumes index.js, so, we just need to import the folder
import {fetchStream} from '../../actions';

class StreamShow extends Component {
  componentDidMount () {
    this.props.fetchStream (this.props.match.params.id); // the match.params.id stuff is from google auth i think? will need to check
  }
  render () {
    // UX Thing: if the fetch to streams is  still loading, show this to look nice
    if (!this.props.stream) {
      return (
        <div>
          Loading...
        </div>
      );
    }

    // destructure out the title and description of the stream just to clean up the JSX
    const {title, description} = this.props.stream;

    return (
      <div>
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>
    );
  }
}

// get the state and map it to props
const mapStateToProps = (state, pureProps) => {
  return {
    // get the correct stream by the stream id by indexing the 'object database' rememner streams is a key 'alias' in the store to access streams state
    stream: state.streams[pureProps.match.params.id],
  };
};

export default connect (mapStateToProps, {fetchStream}) (StreamShow);
