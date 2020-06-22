import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {connect} from 'react-redux';
import {fetchStreams} from '../../actions';

//this component lists all the streams [will timport the action creator to fetch streams, and then invoke that action on an event
//and dispatch it in connect()]
class StreamList extends Component {
  //use component did mount to send the action and/or a network request as soon as the component is invoked and loaded
  componentDidMount () {
    this.props.fetchStreams (); //this is the action to fethc all the streams [make sure the api server is running]
  }

  //method to render delete and edit buttons if the user owns the stream in th elist of streams on the page [see video252/254]
  renderAdmin (stream) {
    //if the current stream in the map of li's userid is === to the current user that is signed in on this networks id in redux store, render the buttons else, do not render them aswe are seeing a stream in the list that is NOT owned by us
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          {/**here is where our other routes/pages come in to play for deletign and editing a stream! these will be wired up onclick events
          and have a Link compoentn and link to the new pages*/}
          <button className="ui button primary">
            Edit
          </button>
          <button className="ui button negative">
            Delete
          </button>
        </div>
      );
    }
  }

  //method to render list (extracted from render () just to clean it up)
  renderList () {
    //map out all the streams that exist in the list of streams in our store [received from mapping the state to props]
    return this.props.streams.map (stream => {
      return (
        <div className="item" key={stream.id}>
          {/**render the edit/delete button or not depending on the userID in state versus the logged in user so the user can have admin access to the stream */}
          {this.renderAdmin (stream)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            {stream.title}
            <div className="description">
              {stream.description}
            </div>
          </div>
        </div>
      );
    });
  }

  renderCreateButton () {
    //issignedin is mapped to props for us with that alias via the auth portion of state
    if (this.props.isSignedIn) {
      return (
        <div style={{textAlign: 'right'}}>
          {/*streams/new is a route in our router! it renders the component of stream create in our architexture: see app.js !!!!*/}
          <Link to="/streams/new" className="ui button primary">
            Create Stream
          </Link>
        </div>
      );
    }
  }

  render () {
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">
          {this.renderList ()}
        </div>
        {/**renders create stream button if the user is signed in */}
        {this.renderCreateButton ()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    streams: Object.values (state.streams), //turns the streams object we used to store our streams records to an array and returns it all into streams key which is now in props which we know that mapstate to props does in the connect function
    currentUserId: state.auth.userId, //will get the current user thats signed in id from the state
    isSignedIn: state.auth.isSignedIn, //get their logged in status such that we can use this state to conditionally render the create stream button or not
  };
};

//connect returns a dispatch (function) to dispatch the action and apply state to props on the current component: do not forget to call that dipatch via (component) trailing connecect
export default connect (mapStateToProps, {fetchStreams}) (StreamList);
