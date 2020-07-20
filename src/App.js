import React, { Component } from 'react';
import TodoApp from './components/todo/TodoApp';
import './App.css';
import './bootstrap.css';
 
class App extends Component {
  render() {
    return (
      <div>
        <TodoApp></TodoApp>
      </div>
    );
  }
}
export default App;