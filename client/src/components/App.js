import React from 'react';

//for setting up paths for our our pages in the app (we need to actually make a navbar though: see Header.js)
import {Router, Route, Switch} from 'react-router-dom';
import history from '../history';

//import components for router
import StreamList from './streams/StreamList';
import StreamCreate from './streams/StreamCreate';
import StreamShow from './streams/StreamShow';
import StreamDelete from './streams/StreamDelete';
import StreamEdit from './streams/StreamEdit';
import Header from './Header';

function App () {
  return (
    //setup routing for the app: this basically says for each posssible route we can navigate to, it render the exact component passed to it
    //this is not navigation: thats in our header component
    (
      <div className="ui container">
        {/**see optional video in react course and also video 257/258 [we are giving the router, not browser router anymore its own hisotry to meintain] */}
        <Router history={history}>
          {/*Header should be wraspped as a child of browsaer router/router, so we can use Link component in nav, but it should still be
          mounted ABOVE our routes!*/}
          <Header />
          <Switch>
            {/**the components are rendered by a route so props are passed magically about the route to each component (this is important for the aspect of getting a stream id, (if we put :id in a route, etc (See video 263))) */}
            <Route path="/" exact component={StreamList} />
            <Route path="/streams/new" exact component={StreamCreate} />
            <Route path="/streams/show" exact component={StreamShow} />
            <Route path="/streams/delete" exact component={StreamDelete} />
            <Route path="/streams/edit/:id" exact component={StreamEdit} />
            {' '}
            {/**will edit the desired string in the path for the selected stream to edit on the button even in stream list component where we map the streams */}
          </Switch>
        </Router>
      </div>
    )
  );
}

export default App;
