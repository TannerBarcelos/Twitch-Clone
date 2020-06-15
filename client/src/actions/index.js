import streams from '../apis/streams'; //axios instance definer to make requests to backend [this type of design is used a lot..study it and get used to it]

//technique: make string constants in a types.js file for the action types and use them as vars in our action creators to make life easier
import {SIGN_IN, SIGN_OUT} from './types';

//notice no returned payload: these actions are simply used for booleans and signing in a user with auth
export const signIn = id => {
  return {
    type: SIGN_IN,
    payload: id,
  };
};
export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

//async so need thunk and explicit dispatch: send a post request to the db.json file passing it formValues (given in the actionCreator call in the createStream component)
//notice though, we have no reducer for this.
export const createStream = formValues => async dispatch => {
  streams.post ('/streams', formValues);
  //we imported streams which is our axios instance from apis folder which will send a post request to the 3001 localhost,
  //at the route of /streams [this type of stuff would be different with express kinda. see the ecommerce app]
};
