import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form'; //capital imports here are to be components in react

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
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`; //defines the sematic ui classname for the input field: if no error just render 'field' for ui else, error
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="OFF" />
        {this.renderError (meta)}
      </div>
    );
  };

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
  const errors = {};

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

export default reduxForm ({
  form: 'streamCreate',
  validate: validate, //as we know, if key/val are same name, we can negate the val, and the key will just know what to refrence [must match some data, fucntion etc. it references in the file though]
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
