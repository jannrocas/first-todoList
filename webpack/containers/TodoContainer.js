import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Todo from '../components/Todo';
import * as TodoActions from '../actions/TodoActions';

class TodoContainer extends Component {
  render() {
    const { todos, dispatch } = this.props;
    return (
      <Todo todos={todos}
        {...bindActionCreators(TodoActions, dispatch)} />
    );
  }
}

function mapStateToProps(state) {
  return {
    todos: state.todos
  };
}

export default connect(mapStateToProps)(TodoContainer);
