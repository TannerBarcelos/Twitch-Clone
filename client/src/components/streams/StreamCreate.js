import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form'; //capital imports here are to be components in react [reducForm is a method like connect() literally that will 'map' form state to this component to control it]
import {connect} from 'react-redux'; //needed to map state as props from the store as we know [we already use reduxForm which does kinda the same thing for form state... see how we go about this below :)]
import {createStream} from '../../actions'; //create stream action creator

class StreamCreate extends Component {
  /**
   * remember in react, if we are doing form input and input stuff, we want to control that input
   * by continually re-rendering the value of an input, and current state of that input by calling onChanges
   * with callbacks to update state. well, with redux form, we can do this a little easier: see below
   */

  //passed meta from renderinput for validation: meta contains error and touched properties in which we want to extract out and work on
  //see video 242
  renderError = ({error, touched}) => {
    //arror function to refrain from the binding issue: always bind callbacks or make arrows!!
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">
            {error}
          </div>
        </div>
      );
    }
  };

  //input is from the reduxForm function that maps input to us. label is given from fields label itself that this method is called on
  //and meta is the object that represents the validate errors for the form

  //remmener that renderInput() is called from Field component={} therefore, as Field is a redux-form component and reduxForm()(this)
  //calls this component, we are automatically given a ton of redux-form props we can use! therefore, the reason we can receive label here is
  //because we call the method on the particular Field component which in turns maintains all the form input state, controlled input, etc! this is much cooler than normal controlled components
  renderInput = ({input, label, meta}) => {
    //takes the whole set of form props [destrucutred as input] key/vals and put them all as attributes for the input
    //in redux devtools we see that all the callback control stuff we've learned before is actually ahdnled for us!
    //we only need to make sure we wire up everything back to the dom element
    const fieldStyle = `field ${meta.error && meta.touched ? 'error' : ''}`; //defines the sematic ui classname for the input field: if no error just render 'field' for ui else, error REMEMBER: you can do logic inside both {} in JSX and ALSO string interpolation
    return (
      <div className={fieldStyle}>
        <label>{label}</label>
        <input {...input} autoComplete="OFF" />
        {this.renderError (meta)}
      </div>
    );
  };

  //handleSubmit will call this method and instead, pass this method the form inputs from the form and we can then
  //do whatever we want! super cool
  onSubmit = formValues => {
    //form submitted: we have gotten the form values [given to us by handleSubmit() <-redux-form method that handles the internal state of input
    // and controlling form] and its passed the insubmit method to get all the data: since we have the form data, we can send this data to our server and
    //do backend logic to build a stream and save that information [see video 244]

    this.props.createStream (formValues);
    //createStream actrion creator -> given to us as props through connect() which connects us to our redux store [the action creator is imported as we know]
    //and it is dispatched as arg 2 of connect -> this action creator expects the form data to send to reducer to process, so, we pass it the formValues
    // we get from using redux-form logic in this component [directly given from line 65 in handleSubmit redux-form m,ethod! cool]
  };

  render () {
    return (
      <form
        //use the props from redux-form handleSubmit to handle submit and call it passing our custom onsubmit method
        onSubmit={this.props.handleSubmit (this.onSubmit)} //onSubmit is a reference to the method, its a callback, therefore as we know, all undefined props/errors we get usually mean we did not bind methods to this for callbacks so on submit should be bound (just use arrow functions here on out. its easier)
        className="ui form error"
      >
        {/**name prop is mandatory for form fields
        field needs a way to know how to render, so, it needs to be passed a component prop also which references a method in our class component
        label prop goes into the component prop as its own object we can destrucutre
        component{} will pass the redux-form props to the given fucntion. redux-form has tons fo methods to work with see video 239->243
        */}
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

//validation step: receives the form values from the redux-form object magically [this is a funky, magical like function]
const validate = formValues => {
  const errors = {}; //must have an object of errors

  //the mandatory name=title and name=description are the reference names of the objext redux-form makes

  //if statement properties get returned in errors object which MUST match the names of form inputs

  if (!formValues.title) {
    //only ran if the user did not enter a title
    errors.title = 'must enter a title';
  }
  if (!formValues.description) {
    errors.description = 'must enter a description';
  }

  return errors; //must return errors from the validate
};

//put the reduxcFrom into its own variable like this if using connect() else, see video 248 before this change to see other syntax of reduxfROM()() calling just like connect
const formWrapped = reduxForm ({
  form: 'streamCreate', //key here has to be named form because it referenccces the key 'form' in combine reducers when setting up the redux-form for this app
  validate: validate, //as we know, if key/val are same name, we can negate the val, and the key will just know what to refrence [must match some data, fucntion etc. it references in the file though]
}) (StreamCreate);

//connect and reduxform functions are being used: new syntax of the export now!
export default connect (null, {createStream}) (formWrapped);

//tons of props are now existent in this component! similar to the mapStateToProps of course
//however redux-form passes tons of props to the component for us

/**
 * reduxForm() returns a function just like connect does it react-redux
 * and we call that returned function via passing it StreamCreeate here. this ensures
 * that we can call redux form and return a dispatch like method to streamcreate with all the form data
 * 
 * just like connect() which returns a function [dispatch() implicitely likewe are used to] and returns that function
 * to be called on the component we are calloing witht he second set of ()
 * 
 * notice we put reduxcform into a function expression (saved in a var) and also called the component as the second call liek we should be , and like we know from using connect()
 * 
 * becasue we need connect here to map state itself, we want to extraxt the reduxform into this function idea, called on component but then 
 * export default connect like we know , passing action creators to dispatch, but we no longer call the component to get the props! we call the function
 * in which deals with the reduxForm state and passes to the component: the formWrapped is like a wrapper function. it will perform its redux form state stuff
 * pass all those properties as props to the component in the returned functiona dn then in order to also get app state, we use connect on the export 
 * and pass like normal the action creators BUT call the returned inner function passed in the wrapper instead. see video 248 for explanation
 * 
 * 
 * remember that reduxForm is a simple library for handling controlled components with forms and an easy way for redux to do all the controlling and we simply
 * need to deal with validation, extracting the saved data and sending it to app level store for overall app level logic
 * 
 */
