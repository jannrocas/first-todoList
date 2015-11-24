import * as types from '../constants/TodoConstants';
import Immutable from 'immutable';

export function todos(state=Immutable.fromJS([]), action={}) {
  switch (action.type) {
    case types.ADD_TODO:
      state = state.push(Immutable.fromJS(
        {
          id: action.id,
          text: action.text
        }
      ));
      return state;

    case types.UPDATE_TODO_TEMPORARY_ID:
      state = state.map(todo => {
        if (todo.get('id') === action.temporary_id) {
          todo = todo.set('id', action.real_id);
        }
        return todo;
      });
      return state;

    default:
      return state;
  }
}
