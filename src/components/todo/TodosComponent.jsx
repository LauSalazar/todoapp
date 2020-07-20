import React, {Component} from 'react';
import TodoDataService from '../../api/todo/TodoDataService.js';
import AuthenticationService from '../todo/AuthenticationService.js';
import moment from 'moment';

class TodosComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            todos: [],
            message: null
        }
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this);
        this.refreshTodos = this.refreshTodos.bind(this);
        this.addTodoClicked = this.addTodoClicked.bind(this);
    }

    componentDidMount(){
        this.refreshTodos();
    }

    deleteTodoClicked(id){
        let userName = AuthenticationService.getUsername();
        TodoDataService.deleteTodo(userName, id)
        .then( () =>{
            this.refreshTodos();
            this.setState({message: 'Todo deleted successfuly'});
            setTimeout(() => { 
                this.setState({message:null})
             }, 3000);
        })
        .catch(err => console.log(err));
    }

    updateTodoClicked(id){
        this.props.history.push(`/todos/${id}`);
    }

    addTodoClicked(){
        this.props.history.push(`/todos/-1`);
    }

    refreshTodos(){
        TodoDataService.retrievedAllTodos(AuthenticationService.getUsername())
        .then( response => {
            this.setState({ todos: response.data });
        })
        .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <h1>List todos</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Is completed?</th>
                                <th>Target date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.todos.map (todo => 
                                <tr key={todo.id}>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                    <td><button className="btn btn-success" onClick={() => this.updateTodoClicked(todo.id)}>Update</button></td>
                                    <td><button className="btn btn-warning" onClick={() => this.deleteTodoClicked(todo.id)}>Delete</button></td>
                                </tr>
                            )}
                            
                        </tbody>
                    </table>
                    <button className="btn btn-success" onClick={this.addTodoClicked}>Add</button>
                </div>
            </div>
        )
    }
}

export default TodosComponent;