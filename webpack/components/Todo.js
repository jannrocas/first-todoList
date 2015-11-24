import React, { PropTypes, Component } from 'react';
var ImmutableRenderMixin = require('react-immutable-render-mixin');

import './Todo.scss';
import cat_image from './images/Todo-cat.jpg';

var Todo = React.createClass({
  displayName: 'Todo',

  mixins: [ImmutableRenderMixin],

  getInitialState() {
    return {};
  },

  handleOnSubmit(event) {
    event.preventDefault();
    let input = this.refs.input_text;

    if (input.value.length > 0) {
      this.props.addTodo(input.value);
      input.value = '';
    }
  },

  render() {
    const { todos } = this.props;
    let lists = [];

    todos.forEach(todo => {
      lists.push(
        <li key={todo.get('id')} id={todo.get('id')}>
          <a href="javascript:">{todo.get('text')}</a>
        </li>
      );
    });

    return (
      <div className="todo_list">
        <h1>Todo</h1>
        <form onSubmit={this.handleOnSubmit}>
          <input ref="input_text" type="text"/>
        </form>
        <ul>
          {lists}
        </ul>
      </div>
    );
  }
});

module.exports = Todo;
