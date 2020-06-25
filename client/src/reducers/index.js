import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form'; //named it formReducer to make the value of mandatory key 'form' in our store easier to read

//reducer imports for store
import authReducer from './authReducer';
import streamsReducer from './streamReducer';

export default combineReducers ({
  auth: authReducer, //for all authentication state [we refer to this in compoentns mapstate as state.auth.stateObjectKey in that file]
  form: formReducer, //redux form is a reducer itself: it does all the work so we just pass a reference to it from the import and have to name it form (go to StreamCreate to see why -> we need to 'map' the form data to the component with the form)
  streams: streamsReducer, //streams key now is the state key we can reference in components when mapping state to props
});

/**
 * redux form reducer is created for us when installing and using redux-form. super cool
  the key name MUST be called form, though and the import from 'redux'form' should be {reducer} or to make it nicer {reducer as formReducer}
 */
