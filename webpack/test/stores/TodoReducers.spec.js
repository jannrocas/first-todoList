import { expect } from 'chai';
import * as TodoReducers from '../../stores/TodoReducers';
import * as types from '../../constants/TodoConstants';
import Immutable from 'immutable';

describe('todos reducer', () => {
  it('should return the initial state', () => {
    expect(TodoReducers.todos(undefined, {})).to.deep.equal(Immutable.fromJS([]));
  });

  it('should handle TOGGLE todo', () => {
     expect(
        TodoReducers.todos(Immutable.fromJS([{ id: 1, text: 'Buy this' , completed: false, labelIds: []}]), {
           type: types.TOGGLE_TODO,
           id: 1
        }).toJS()
     ).to.deep.equal([
        {
           id: 1,
           text: 'Buy this',
           completed: true,
           labelIds: []
        }
     ]);
  });

 /* it('should handle toggle Todo', () => {
     expect(
       TodoReducers.todos(Immutable.fromJS([{ id: 1, text: 'Buy this' , completed: false, labelIds: []}]), {
          type: types.TOGGLE_TODO,

       })
     );

 });
  it('should handle add todo', () => {
    expect(
      TodoReducers.todos(undefined, {
        type: types.ADD_TODO,
        id: 1, text: 'Buy this'
      }).toJS()
    ).to.equal([
      { id: 1, text: 'Buy this' , completed: false, labelIds: []}
    ]);

    expect(
      TodoReducers.todos(Immutable.fromJS([{ id: 1, text: 'Buy this' , completed: false, labelIds: []}]), {
        type: types.ADD_TODO,
        id: 2, text: 'Buy that'
      }).toJS()
    ).to.equal([
        { id: 1, text: 'Buy this' , completed: false, labelIds: []},
        { id: 2, text: 'Buy that' , completed: false, labelIds: []}
    ]);
  });
  */
});

describe('labels reducer', () => {

   it('should handle add label', () => {
      expect(
         TodoReducers.labels(undefined, {
            type: types.CREATE_LABEL,
            label: "Work",
            color: 'green'
         }).toJS()
      ).to.deep.equal([
         {
            name: "All",
            color: 'green'
         },
         {
            name: "Work",
            color: 'green'
         }
      ]);
   });

   it('should handle add todo label', () => {
      expect(
         TodoReducers.todos(Immutable.fromJS([{ id: 1, text: 'Buy this' , completed: false, labelIds: []}]), {
            type: types.ADD_TODO_LABEL,
            id: 1,
            label: 1
         }).toJS()
      ).to.deep.equal([
         {
             id: 1,
             text: 'Buy this',
             completed: false,
             labelIds: [1]
         }
      ])
   });

   it('should handle remove todo label', () => {
      expect(
         TodoReducers.todos(Immutable.fromJS([{ id: 1, text: 'Buy this' , completed: false, labelIds: [1,2]}]), {
            type: types.REMOVE_TODO_LABEL,
            id: 1,
            label: 2
         }).toJS()
      ).to.deep.equal([
         {
             id: 1,
             text: 'Buy this',
             completed: false,
             labelIds: [1]
         }
      ])
   });

   it('should handle adding duplicate todo label', () => {
      expect(
         TodoReducers.todos(Immutable.fromJS([{ id: 1, text: 'Buy this' , completed: false, labelIds: [1,2]}]), {
            type: types.ADD_TODO_LABEL,
            id: 1,
            label: 2
         }).toJS()
      ).to.deep.equal([
         {
             id: 1,
             text: 'Buy this',
             completed: false,
             labelIds: [1,2]
         }
      ])
   });

});

describe('labels reducer', () => {

});
