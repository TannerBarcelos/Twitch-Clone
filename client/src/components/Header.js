import React from 'react';

import GoogleAuth from './GoogleAuth';

//import link : always use Link component to create react style anchors
import {Link} from 'react-router-dom';

//this component represents the nav bar for our app (will mount above browser router in the app)

function Header () {
  return (
    <div style={{paddingTop: '10px'}} className="ui secondary pointing menu">
      {/*link Home tab to / (the home page) always use <Link> when linking to different pages in an app with react. it is the design pattern*/}
      <Link to="/" className="item">
        Home
      </Link>
      <div className="right menu">
        {/*All streams link also goes back to landing page because like twitch, we want the landing to show all streams */}
        <Link to="/" className="item">
          All Streams
        </Link>
        <GoogleAuth />
      </div>
    </div>
  );
}

export default Header;
