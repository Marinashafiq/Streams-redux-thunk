import React from 'react';
import { Field, reduxForm } from 'redux-form';
// import { createStream } from '../../actions';

class StreamForm extends React.Component {

    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }

    // renderInput(formProps) {
    renderInput = ({ input, label, meta }) => {
        console.log(meta);
        // console.log(formProps);
        // return <input onChange={formProps.input.onChange} value={formProps.input.value} />
        // Shorted Way 
        // return <input {...formProps.input} />
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`
        return (
            <div className={className}>
                <label> {label} </label>
                <input {...input} />
                {this.renderError(meta)}
            </div>
        )

    }

    onSubmit = (formValues) => {
        console.log(formValues);
        this.props.onSubmit(formValues);
    }

    render() {
        return (
            <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name="title" component={this.renderInput} label="Enter Title" />
                <Field name="description" component={this.renderInput} label="Enter Description" />
                <button className="ui button primary">Submit</button>
            </form>
        )
    }
}

const validate = formValues => {
    const errors = {};
    if (!formValues.title) {
        // only if user didn't enter a title
        errors.title = "You must enter a title";
    }

    if (!formValues.description) {
        errors.description = "You must enter a description";
    }

    return errors;
}

export default reduxForm({
    form: 'StreamForm',
    validate
})(StreamForm);
