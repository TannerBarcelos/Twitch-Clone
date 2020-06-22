//import our action types
import {
  CREATE_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
  EDIT_STREAM,
  DELETE_STREAM,
} from '../actions/types';

//lodash for memoization
import _ from 'lodash';

//this will exist in store and actions can invoke it if the action type from our action anywhere invokes it (dispatched to the store)
export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAMS:
      //return a new object of the current state and mapKeys (lodash function) the keys and payload with the id's as the key [see video 248/249]
      return {...state, ..._.mapKeys (action.payload, 'id')};
    case FETCH_STREAM:
      //remember that reducers always take old state, put the new data from action payload and return it as a new version of it with the old + new
      //remember when we make a new object with the spread operator, we can chain on more new properties with the key interpolationa dn value AFTER THE spreading of the source
      //the id is the stream id and the payload is going to be the data from that action creator to give to the new key/value of the state
      return {...state, [action.payload.id]: action.payload};
    case CREATE_STREAM:
      return {...state, [action.payload.id]: action.payload};
    case EDIT_STREAM:
      return {...state, [action.payload.id]: action.payload};
    case DELETE_STREAM:
      return _.omit (state, action.payload); //delete payload is the stream id itself so no need for .id etc. chained on [omit() takes the object to change 9array, object, etc.)
    // and then the data to remove from the current state of that data, and returns the object given MINUS the payload passed [hover over omit and see example]]
    default:
      return state;
  }
};

/**
 * reducers must always returns the same state type as the state that reducer takes in and the action dispatched to it in connect()
 */
