import { expect } from 'chai';
import * as TodoReducers from '../../stores/TodoReducers';
import * as types from '../../constants/TodoConstants';
import Immutable from 'immutable';

describe('todos reducer', () => {
  it('should return the initial state', () => {
    expect(TodoReducers.todos(undefined, {})).to.deep.equal(Immutable.fromJS([]));
  });

  it('should handle add todo', () => {
    expect(
      TodoReducers.todos(undefined, {
        type: types.ADD_TODO,
        id: 1, text: 'Buy this'
      }).toJS()
    ).to.deep.equal([
      { id: 1, text: 'Buy this' }
    ]);

    expect(
      TodoReducers.todos(Immutable.fromJS([{ id: 1, text: 'Buy this' }]), {
        type: types.ADD_TODO,
        id: 2, text: 'Buy that'
      }).toJS()
    ).to.deep.equal([
        { id: 1, text: 'Buy this' },
        { id: 2, text: 'Buy that' }
    ]);
  });
});
