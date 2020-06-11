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
