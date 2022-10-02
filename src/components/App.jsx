// import Counter from './Counter';
// import Dropdown from './Dropdown';
// import ColorPicker from './ColorPicker';
import React, { Component } from 'react';
import shortid from 'shortid';
import TodoList from './TodoList';
import TodoEditor from './TodoEditor';
import Filter from './Filter';
import Container from './Container';
import initialTodos from './todos.json';

// const colorPickerOptions = [
//   { label: 'red', color: '#F44336' },
//   { label: 'green', color: '#4CAF50' },
//   { label: 'blue', color: '#2196F3' },
//   { label: 'grey', color: '#607D8B' },
//   { label: 'pink', color: '#E91E63' },
//   { label: 'indigo', color: '#3F51B5' },
// ];

class App extends Component {
  state = {
    todos: initialTodos,
    filter: '',
  };

  addTodo = text => {
    const todo = {
      id: shortid.generate(),
      text,
      completed: false,
    };

    this.setState(({ todos }) => ({
      todos: [todo, ...todos],
    }));
  };

  deleteTodo = todoId => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  };

  toggleCompleted = todoId => {
    // this.setState(prevState => ({
    //   todos: prevState.todos.map(todo => {
    //     if (todo.is === todoId) {
    //       return {
    //         ...todo,
    //         completed: !todo.completed,
    //       };
    //     }

    //     return todo;
    //   }),
    // }));

    this.setState(({ todos }) => ({
      todos: todos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleTodos = () => {
    const { todos, filter } = this.state;

    const normalizedFilter = filter.toLowerCase();

    return todos.filter(todo =>
      todo.text.toLowerCase().includes(normalizedFilter)
    );
  };

  calculateCompletedRodos = () => {
    const { todos } = this.state;

    return todos.reduce((acc, todo) => (todo.completed ? acc + 1 : acc), 0);
  };

  render() {
    const { todos, filter } = this.state;
    const totalTodoCount = todos.length;
    const completedTodosCount = this.calculateCompletedRodos();
    const visibleTodos = this.getVisibleTodos();

    return (
      <Container>
        <div>
          <p>Total todos: {totalTodoCount}</p>
          <p>Completed todos: {completedTodosCount}</p>
        </div>
        {/* <ColorPicker options={colorPickerOptions} /> */}
        {/* <h1>Состояние компонента</h1>
      <Dropdown /> */}
        {/* <Counter /> */}

        <TodoEditor onSubmit={this.addTodo} />

        <Filter value={filter} onChange={this.changeFilter} />

        <TodoList
          todos={visibleTodos}
          onDeleteTodo={this.deleteTodo}
          onToggleCompleted={this.toggleCompleted}
        />
      </Container>
    );
  }
}

// export const App = () => {
//   return (
//     <>
//       {/* <ColorPicker options={colorPickerOptions} /> */}
//       {/* <h1>Состояние компонента</h1>
//       <Dropdown /> */}
//       {/* <Counter /> */}
//       <TodoList />
//     </>
//     // <div
//     //   style={{
//     //     height: '100vh',
//     //     display: 'flex',
//     //     justifyContent: 'center',
//     //     alignItems: 'center',
//     //     fontSize: 40,
//     //     color: '#010101',
//     //   }}
//     // >
//     //   React homework template
//     // </div>
//   );
// };

export { App };
