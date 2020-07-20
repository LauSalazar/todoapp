import axios from 'axios';
import { JPA_URL_API } from '../../Constans.js'

class TodoDataService {

    retrievedAllTodos(name){
        return axios.get(`${JPA_URL_API}/users/${name}/todos`);
    }
    deleteTodo(name, id){
        return axios.delete(`${JPA_URL_API}/users/${name}/todos/${id}`);
    }
    retrieveTodo(name,id){
        return axios.get(`${JPA_URL_API}/users/${name}/todos/${id}`);
    }
    updateTodo(name, id, todo){
        return axios.put(`${JPA_URL_API}/users/${name}/todos/${id}`, todo);
    }

    createTodo(name, todo){
        return axios.post(`${JPA_URL_API}/users/${name}/todos/`, todo);
    }
} 


export default new TodoDataService()