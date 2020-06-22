import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

//reducer imports for store
import authReducer from './authReducer';
import streamsReducer from './streamReducer';

//reducer alias will be the key of the global store to reference when mapping state to props -> so i every component, when mapping state to props,
//we can use the state object in the params of mapState.. to access the key of the specific reducer we want to use and extract state to props
//REMEMBER: TO CHANGE STATE, WE NEED TO USE A DISPATCHER TO DO THAT! THAT IS THE SECOND PARAM OF COONECT() WHICH DISPATCHES ALL NEEEDED ACTION CREATORS WE WANT TO USE
//IN ANY COMPONENT, TO OUR STORE [WHICH IS ALL COMBINED WITH COMBINE REDUCER HERE BUT GETS SHOVED TO ALL REDUCERS]
export default combineReducers ({
  auth: authReducer, //for all authentication state [we refer to this in compoentns mapstate as state.auth]
  form: formReducer, //redux form is a reducer itself: it does all the work so we just pass a reference to it from the import and have to name it form (go to StreamCreate to see why -> we need to 'map' the form data to the component with the form)
  streams: streamsReducer, //streams key now is the state key we can reference in components when mapping state to props
});

/**
 * redux form reducer is created for us when installing and using redux-form. super cool
  the key name mUST be called form, though. must import the named export by the exact name as reducer [we can alias it with 'as' and some shorthand name]
 */
