import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
//import {thunk} from 'redux-thunk';

//import App
import App from './components/App';
import reducers from './reducers'; //the index.js in reducers which combines all our reducers to make global state

//hooking up redux store to the browser to use devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//create reduxstore with our reducers [combined reducers]
const store = createStore (reducers, composeEnhancers (applyMiddleware ()));

//attach the react in a whole to the html
ReactDOM.render (
  //wrap the whole app in our provider to provide redux state to the app! give the store the created store [our app now will officially have a global store of state in which we can access via connect middle man in any component and actions/reducers]
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById ('root')
);

/**
 * clientID: 106342742873-ntgcr1aoiros0i86ddb7uk5cvn5t1fi2.apps.googleusercontent.com
 */
