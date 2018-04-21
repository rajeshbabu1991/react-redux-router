import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createPost } from '../actions';

class PostsNew extends Component {
    renderField(field) {
        // { meta } ==> (meta = field.meta)
        // { meta: { touched, error } } ==> (touched = field.meta.touched) same for error.

        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    type={field.type}
                    className = "form-control"
                    {...field.input}
                    // Equivalent to
                    // onChange = {field.input.onChange}
                    // onFocus = {field.input.onFocus}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    // Passed as a callback to handleSubmit and not an argument.
    onSubmit(values) {
        //this is the component
        console.log(values);
        this.props.createPost(values, ()=>{
            this.props.history.push('/');
        });
    }

    render() {

        const { handleSubmit } = this.props; // Pulling a property from this.props called handleSubmit

        return (
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Field
                name="title"
                component={this.renderField}
                label="Title"
                type = "text"
              />
              <Field
                name="categories"
                component={this.renderField}
                label="Categories"
                type="text"
              />
              <Field
                name="content"
                component={this.renderField}
                label="Page Content"
                type="textarea"
              />
              <button type="submit" className="btn btn-primary">Submit</button>
              <Link to="/" className="btn btn-danger">Cancel</Link>
          </form>
        );
    }
}

function validate(values) {
    // console.log(values) -> has all the details from input.
    // {name: value}
    const errors = {};

    // validate the inputs from 'values'.
    if(!values.title) {
        errors.title = "Enter a title";
    }
    
    if(!values.categories) {
        errors.categories = "Enter some categories";
    }

    if(!values.content) {
        errors.content = "Enter some content please";
    }

    // empty error object means that no issues.
    return errors;
}

// Adds a ton of additional props to our component which can be accessed by using this.props.
export default reduxForm({
 validate, // validate: validate in ES5
 form: 'PostNewForm'
})(
    connect(null, { createPost })(PostsNew)
);
