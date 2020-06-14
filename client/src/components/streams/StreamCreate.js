import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form'; //capital imports here are to be components in react

class StreamCreate extends Component {
  /**
   * remember in react, if we are doing form input and input stuff, we want to control that input
   * by continually re-rendering the value of an input, and current state of that input by calling onChanges
   * with callbacks to update state. well, with redux form, we can do this a little easier: see below
   */

  renderInput({input, label}) {
    //takes the whole set of form props [destrucutred as input] key/vals and put them all as attributes for the input
    //in redux devtools we see that all the callback control stuff we've learned before is actually ahdnled for us!
    //we only need to make sure we wire up everything back to the dom element
    return (
      <div className="field">
        <label>{label}</label>
        <input {...input} />
      </div>
    );
  }

  //handleSubmit will call this method and instead, pass this method the form inputs from the form and we can then
  //do whatever we want! super cool
  onSubmit (formValues) {
    console.log (formValues);
  }

  render () {
    return (
      <form
        //use the props from redux-form handleSubmit to handle submit and call it passing our custom onsubmit method
        onSubmit={this.props.handleSubmit (this.onSubmit)}
        className="ui form"
      >
        {/**name prop is mandatory for form fields
        field needs a way to know how to render, so, it needs to be passed a component prop also which references a method in our class component
        label prop goes into the component prop as its own object we can destrucutre
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

export default reduxForm ({
  form: 'streamCreate',
}) (StreamCreate);

//tons of props are now existent in this component! similar to the mapStateToProps of course
//however redux-form passes tons of props to the component for us

/**
 * reduxForm() returns a function just like connect does it react-redux
 * and we call that returned function via passing it StreamCreeate here. this ensures
 * that we can call redux form and return a dispatch like method to streamcreate with all the form data
 * 
 * just like connect() which returns a function [dispatch() implicitely likewe are used to] and returns that function
 * to be called on the component we are calloing witht he second set of ()
 */
