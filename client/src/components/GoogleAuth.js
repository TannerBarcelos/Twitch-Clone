import React, {Component} from 'react';

import {connect} from 'react-redux';

//import actions to component we want to give stsate to from our store: remember, we pass our action creators to connecT(,here) to dispatch the actions
//to the store and invoke reducers to change state
import {signIn, signOut} from '../actions/index';

/**
 * Google auth component which renders login/logout google buttons and uses gapi methods for creating a new auth object, signing in a user or signing out
 * please see docs for reference
 */

class GoogleAuth extends Component {
  //load the OATH system from google -> use did mount lifecycle method for requests that should happen immediately on load
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      //this is async: returns a promise -> this is where we will initiate the nww auth instance to sign the user in
      window.gapi.client
        .init({
          clientId:
            '106342742873-ntgcr1aoiros0i86ddb7uk5cvn5t1fi2.apps.googleusercontent.com',
          scope: 'email', //the list of scopes [methods of authorization]
        })
        .then(() => {
          //create a new auth reference to use for the user auth
          this.auth = window.gapi.auth2.getAuthInstance();
          //update auth in our redux store
          this.onAuthChange(this.auth.isSignedIn.get());
          //listen for changes to sign in for later
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
    /*load up the oath library from googles API -> see video 217-218 in react course [docs: https://developers.google.com/identity/sign-in/web/reference#authentication]
    see these docs to see how to initiate an authentication system for the app
    */
  }

  //use the props mapped from state to sign in or out depending on the auth step
  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId()); //get the authenticated users google id -> this is also a gapi method/logic [see docs]
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn(); //action to sign in: pass to connect() which will magically send the action to the store and access any reducer that takes in an action type === to the action of signin type/payload we made
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  //helper method to do conditional rendering of button for sign in/sign out pertaining to the gapi auth
  renderAuthButton = () => {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button className="ui red google button" onClick={this.onSignOutClick}>
          {/**did not use explicit constructor bind! used arrows and passed it as a callback here so its bound by default when using arrows.
          THIS IS THE BEST PARADIGM! DO NOT USE () ON THE END OR ELSE ITS IMMEDIATELY CALLED! WE WANT THIS TO BE A CALLBACK*/}
          <i className="google icon" />
          Sign out
        </button>
      );
    } else {
      return (
        <button className="ui red google button" onClick={this.onSignInClick}>
          <i className="google icon" />
          Sing in with Google
        </button>
      );
    }
  };

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn, //auth is the key (alias) for the auth reducer in our combined reducers in index/reducers -> reducers make up a whole state!
  };
};

//use connect to hook in to store passing it all the action creators to dispatch to store: reducers will invoke logic, mapStateToProps() always does just that: maps state changed, etc. from our action creators and actions sent ot those reducers to affect app level state
export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);
