import * as types from '../constants/TodoConstants';
import fetch from 'whatwg-fetch';

export function addTodo(text, temporary_id=`temp_todo_id_${Math.floor(Math.random() * (100000 - 1000 + 1)) + 1000}`) {
  return (dispatch, getState) => {
    dispatch(addTodoOptimistic(temporary_id, text));

    setTimeout(() => {
      let real_id = Math.floor(Math.random() * (100000 - 1000 + 1)) + 1000;
      dispatch(updateTodoTemporaryId(temporary_id, real_id));
    }, 2000);
  };
}


export function addTodoOptimistic(id, text) {
  return {
    type: types.ADD_TODO,
    id,
    text
  };
}

export function updateTodoTemporaryId(temporary_id, real_id) {
  return {
    type: types.UPDATE_TODO_TEMPORARY_ID,
    temporary_id,
    real_id
  }
}



export function createLabel(label, color = 'green'){ //
	return { 
		type: types.CREATE_LABEL,
		label,
		color
	};
}

export function toggleTodo(id){ //
	return { type: types.TOGGLE_TODO, id};
}

export function addTodoLabel(id, label){ //
	return { type: types.ADD_TODO_LABEL, id, label }
}

export function removeTodoLabel(id, label){ //
	return { type: types.REMOVE_TODO_LABEL, id, label }
}

export function setcompletionFilter(filter){ //
	return { type: types.COMPLETION_FILTER, filter }
}

export function setLabelFilter(filter){ //
	return { type: types.LABEL_FILTER, filter }
}
