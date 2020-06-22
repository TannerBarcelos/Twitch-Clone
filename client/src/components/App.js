import React from 'react';

//for setting up paths for our our pages in the app (we need to actually make a navbar though: see Header.js)
import {BrowserRouter, Route, Switch} from 'react-router-dom';

//import components for router
import StreamList from './streams/StreamList';
import StreamCreate from './streams/StreamCreate';
import StreamShow from './streams/StreamShow';
import StreamDelete from './streams/StreamDelete';
import StreamEdit from './streams/StreamEdit';
import Header from './Header';

function App () {
  return (
    //setup routing for the app: this is NOT THE NAV BAR! We need to make a nav component, with links and react will know
    //where those links go to because we made a broswer router for react to bundle up all our routes
    (
      <div className="ui container">
        <BrowserRouter>
          {/*Header should be wraspped as a child of browser router, so we can use Link component in nav, but it should still be
          mounted ABOVE our routes!*/}
          <Header />
          <Switch>
            <Route path="/" exact component={StreamList} />
            <Route path="/streams/new" exact component={StreamCreate} />
            <Route path="/streams/show" exact component={StreamShow} />
            <Route path="/streams/delete" exact component={StreamDelete} />
            <Route path="/streams/edit" exact component={StreamEdit} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  );
}

export default App;
