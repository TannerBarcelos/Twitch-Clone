import React, {Component} from 'react';
import {connect} from 'react-redux'; //as we know, to dispatch actions and map state to props

//fetch stream action creator import
import {fetchStream} from '../../actions';

class StreamEdit extends Component {
  //fetch the stream immediately with componentdidmount
  componentDidMount() {
    //id given to us from the route object that renders this component
    this.props.fetchStream(this.props.match.params.id);
  }
  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }
    return <div>{this.props.stream.title}</div>;
  }
}

//state is the current state in our store and pureProps represents the props actually passed to the component via the route component in app.js
//remmeber: state magically holds all our state (See combine reducers to remember the alias (keys) to access that state, but, state always has access)
//and we can also take in the props passed here from route component in react-router-dom
const mapStateToProps = (state, pureProps) => {
  console.log(pureProps);
  return {
    //will get the stream in our streams list of stream objects in the state by indexing (looking up the key) of the id of the stream connected to the stream which is given to us
    //from the route component but of course, exists in our store since we are indexing. notice the long chain of objects in [] see videos 263/264 in react course to see what the hell this is
    /*
    remember we are storing the streams as an object of object record (each stream) so we can grab a stream by its key using []
    */
    stream: state.streams[pureProps.match.params.id],
  };
};
export default connect(mapStateToProps, {fetchStream})(StreamEdit);
