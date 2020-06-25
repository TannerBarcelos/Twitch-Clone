import React, {Component} from 'react';

// streaming dependency
import flv from 'flv.js';

// react-redux/redux stuff
import {connect} from 'react-redux';

// actions: remember the actions are all exported from index.js in actions folder.. javascript is smart and always assumes index.js, so, we just need to import the folder
import {fetchStream} from '../../actions';

class StreamShow extends Component {
  constructor (props) {
    super (props);

    // create a reference to the video element in the DOM with a ref -> this is how to reference html when we are not actually using html in JSX (see docs for the flv library: we are doing this becausue of that)
    this.videoRef = React.createRef ();
  }

  // runs immediately on mount: fetch stream and try to build th eplay. when the video player responds with video, the compontn didUpdate! therefore
  // use another lifecyle method called 'componentDidUpdat' to re0render the componnet and build that player
  componentDidMount () {
    const {id} = this.props.match.params;
    this.props.fetchStream (id); // the match.params.id stuff is from google auth i think? will need to check
    this.buildPlayer (); //build the player [will show it or not depending on the asyncronous response]
  }

  // component updated: build the actual player [re-redners the ui after an update is invoked, automatically, like the player being loaded]
  componentDidUpdate () {
    this.buildPlayer ();
  }

  // cleanup the video resource off the UI when the stream is ended
  componentWillUnmount () {
    // stop attempting to stream and detach from the UI
    this.player.destroy ();
  }

  buildPlayer () {
    if (this.player || !this.props.stream) return;

    const {id} = this.props.match.params;
    this.player = flv.createPlayer ({
      type: 'flv',
      url: `http://localhost:8000/live/${id}.flv`,
    });

    this.player.attachMediaElement (this.videoRef.current);
    this.player.load ();
    this.player.play (); // auto-play
  }

  render () {
    // do nothing till the stream is fetched and ready to mount the video to the screen
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
        {/**controls by default is true, so, we can negate writing {true} as react assumes true for boolean props */}
        <video ref={this.videoRef} style={{width: '100%'}} controls />
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
