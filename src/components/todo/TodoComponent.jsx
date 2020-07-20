import React, {Component} from 'react';
import moment from 'moment';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import AuthenticationService from './AuthenticationService';
import TodoDataService from '../../api/todo/TodoDataService.js';

class TodoComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: this.props.match.params.id,
            description: '',
            targetDate: moment(new Date()).format('YYYY-MM-DD')
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount(){
        let userName = AuthenticationService.getUsername();
        if(this.state.id === '-1'){
            return
        } else {
            TodoDataService.retrieveTodo(userName, this.props.match.params.id)
            .then((resp)=>{
                this.setState({
                    description: resp.data.description,
                    targetDate: moment(resp.data.targetDate).format('YYYY-MM-DD')
                });
            }).catch((err)=> console.log(err));
        }
        
    }

    onSubmit(values){
        let userName = AuthenticationService.getUsername();
        if(this.state.id === '-1'){
            TodoDataService.createTodo(userName, {
                id: this.state.id,
                description: values.description,
                targetDate: values.targetDate
            })
            .then(resp => {
                this.props.history.push('/todos');
            }).catch(err => console.log(err));
        } else {
            TodoDataService.updateTodo(userName, this.state.id, {
                id: this.state.id,
                description: values.description,
                targetDate: values.targetDate
            })
            .then(resp => {
                this.props.history.push('/todos');
            }).catch(err => console.log(err));
        }
        
    }

    validate(values){
        let errors = {};
        if(!values.description){
            errors.description = 'Enter a description';
        } else if(values.description.length<5){
            errors.description = 'Should have atleast 5 characters';
        }
        if(!moment(values.targetDate).isValid) {
            errors.targetDate = 'Enter a valid targe date';
        }
        return errors;
    }
    render(){
        let {description, targetDate} = this.state;
        return (
        <div className="container">Todo component
            <Formik 
            initialValues={{description, targetDate}}
            onSubmit={this.onSubmit}
            validateOnBlur={false}
            validateOnChange={false}
            validate={this.validate}
            enableReinitialize={true}
            >
                {
                    (props) => (
                        <Form>
                            <ErrorMessage name="description" component="div" className="alert alert-warning"></ErrorMessage>
                            <ErrorMessage name="targetDate" component="div" className="alert alert-warning"></ErrorMessage>
                            <fieldset className="form-group">
                                <label>Description</label>
                                <Field className="form-control" type="text" name="description"></Field>
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Target Date</label>
                                <Field className="form-control" type="date" name="targetDate"></Field>
                            </fieldset>
                            <button className="btn btn-success" type="submit">Save</button>
                        </Form>
                    )
                }
            </Formik>
        </div>
        )
    }
}
export default TodoComponent;