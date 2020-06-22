import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App'; //import App
import reducers from './reducers'; //the index.js in reducers which combines all our reducers to make global state

//hooking up redux store to the browser to use devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//create reduxstore with our reducers [combined reducers] and redux dev tools
const store = createStore (
  reducers,
  composeEnhancers (applyMiddleware (reduxThunk))
);

//attach the react in a whole to the html
ReactDOM.render (
  //Must wrap the app component in Provider from reacct-redux to provide a global store for the whole app
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById ('root')
);
