import streams from '../apis/streams'; //axios instance definer to make requests to backend [this type of design is used a lot..study it and get used to it]

//technique: make string constants in a types.js file for the action types and use them as vars in our action creators to make life easier
//and avoid bugs of typos in our action types
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
  const {userId} = getState ().auth;
  const response = await streams.post ('/streams', {...formValues, userId});
  //post the data from the form and the usersID that posted it as an object
  //dispatch create stream as an action type and the axios response object from the post
  //remember async action creators need to dispatch explicitely instead of return
  dispatch ({
    type: CREATE_STREAM,
    payload: response.data,
  });
  //we imported streams which is our axios instance from apis folder which will send a post request to the 3001 localhost,
  //at the route of /streams [this type of stuff would be different with express kinda. see the ecommerce app]
};

//action creator to fetch all the streams: remmeber the action creator is imported to any component we want to use this action on, and then we can call it on some event
//and then we can essentially dispatch these actions [dispatch here since its async] in the connect() function and then the component , as we kniw, has the cnnnect
//middle man which connects us to our state such that we can change state anywhere in the app. refer to notes. this is fundamental !!
export const fetchStreams = () => async dispatch => {
  const response = await streams.get ('/streams');
  dispatch ({
    type: FETCH_STREAMS,
    payload: response.data,
  });
};

//takes in the stream id to fetch one stream
export const fetchSteam = id => async dispatch => {
  const response = await streams.get (`/streams/${id}`);
  dispatch ({
    type: FETCH_STREAM,
    payload: response.data,
  });
};

//edits a stream by given id and the form values entered in a form used to update stream info
export const editStream = (id, formValues) => async dispatch => {
  const response = await streams.put (`/streams/${id}`, formValues);
  dispatch ({
    type: EDIT_STREAM,
    payload: response.data,
  });
};

//gets stream to delete by id
export const deleteStream = id => async dispatch => {
  await streams.delete (`/streams/${id}`);
  dispatch ({
    type: DELETE_STREAM,
    payload: id,
  });
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
