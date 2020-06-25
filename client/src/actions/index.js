import streams from '../apis/streams'; //axios instance definer to make requests to backend [this type of design is used a lot..study it and get used to it]
import history from '../history'; //for programattic navigation -. will auto route user to a route after the action is done and dispatched
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
  DELETE_STREAM,
  EDIT_STREAM,
} from './types';

export const signIn = id => {
  return {
    type: SIGN_IN,
    payload: id,
  };
};

//notice no returned payload: these actions are simply used for booleans and signing in a user with auth
export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

//async so need thunk and explicit dispatch: send a post request to the db.json file passing it formValues (given in the actionCreator call in the createStream component)
//notice though, we have no reducer for this. [notive the function after async has a new second argument getState this will return the current state in redux store if we want it [this applies for thunk or not]]
export const createStream = formValues => async (dispatch, getState) => {
  //pulling userId from state [the current user ID for the post]
  const {userId} = getState ().auth;
  //gathers the form data entered on the page and the usersId who made this stream and returns that data to response so we can send it as a payload
  const response = await streams.post ('/streams', {...formValues, userId});
  dispatch ({
    type: CREATE_STREAM,
    payload: response.data,
  });

  //do some programmatic navigation to get the user back to the root (/) route : will take us automatically THIS IS SO SICK [SEE HISTORY.JS IN ROOT AND ALSO VIDEO 257/258]
  history.push ('/');
};

//action creator to fetch all the streams
export const fetchStreams = () => async dispatch => {
  //gets all the streams in the database and returns them as payload to the store as current state of streams going
  const response = await streams.get ('/streams');
  dispatch ({
    type: FETCH_STREAMS,
    payload: response.data,
  });
};

//takes in the stream id to fetch one stream
export const fetchStream = id => async dispatch => {
  const response = await streams.get (`/streams/${id}`);
  dispatch ({
    type: FETCH_STREAM,
    payload: response.data,
  });
};

//edits a stream by given id and the form values entered in a form used to update stream info [patch will update ]
export const editStream = (id, formValues) => async dispatch => {
  const response = await streams.patch (`/streams/${id}`, formValues);
  dispatch ({
    type: EDIT_STREAM,
    payload: response.data,
  });

  //redirect to home with pragmattic routing
  history.push ('/');
};

//gets stream to delete by id
export const deleteStream = id => async dispatch => {
  await streams.delete (`/streams/${id}`);
  dispatch ({
    type: DELETE_STREAM,
    payload: id,
  });
  //auto navigate them back to the root such that we avoid bugs on the delete button
  history.push ('/');
};

/**
 * AGAIN: REMEMBER,
 *
 * If we make async actions like network requests, we need thunk middleware
 *
 * but, the main thing here is that action creators are simple methods made to export and use in components
 * that basically can take data in, and dispatch to the store to make changes to state. we use connect() to send these actions
 * to the store in which EVERY reducer we have WILL see ALL actions in which we send! It is sort of magic but not
 *
 * We simply need to map state to that component prop to use that data if we want to see data change in our state in the UI
 *
 * all action creators that make requests like we do in almost every action creator here must not return an action/payload to dispatch
 * but must explicitely return an asyn dispatch and await data response and then dispatch the type/payload instead of the implicit
 * dispatch thats done for us in component level
 */
