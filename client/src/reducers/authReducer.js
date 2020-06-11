//using our string contants for types in another file to safeguard from typos: see video 229 in react course
import {SIGN_IN, SIGN_OUT} from '../actions/types';

//we can assign initial root level state like this: good for shopping carts, todo app, etc for an initial list to 0
const INITIAL_STATE = {
  isSignedIn: null,
  userId: null,
};

//remember default argument of state to empty, etc. depending on the data type and strucuture we want unless we want to make some initial state
//and oass that in as the state param for this reducer for some state
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //return the state with is signed in changing to true to signify to the app we are signed in
    case SIGN_IN:
      return {...state, isSignedIn: true, userId: action.payload};
    //vice-versa for sign out
    case SIGN_OUT:
      return {...state, isSignedIn: false, userId: null};
    //and of course as we know, default returns of non-met cases in reducers is always the state itself
    default:
      return state;
  }
};

//default exports do not use destrucuturing: simply name the reference and use it
