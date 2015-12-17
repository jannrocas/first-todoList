import { combineReducers } from 'redux';
import * as types from '../constants/TodoConstants';
import Immutable from 'immutable';

const { SHOW_ALL } = types.CompletionFilters;

const initiateState = {
	todos:[],
	visibilityFilter:{
		completionFilter: SHOW_ALL,
		labelFilter: "All"
	},
	labels: [{name: 'All',
				color: 'green'}
			]
};

export function labels(state=Immutable.fromJS(initiateState.labels), action){

	switch(action.type){
		case types.CREATE_LABEL:
			let duplicateFlag = false;
			state.map(label => {
				if (label.get('name') === action.label) {
					duplicateFlag = true;
				}
			});
				if (!duplicateFlag) {
				state =  state.push(Immutable.fromJS(
					{
						name: action.label,
						color: action.color
		  			}
				));
			}

		  return state;
		default:
			return state;
	}
}

export function visibilityFilter(state = Immutable.fromJS(initiateState.visibilityFilter), action) {
  switch (action.type) {
    case types.COMPLETION_FILTER:
    	return state.set('completionFilter', action.filter);
    case types.LABEL_FILTER:
    	return state.set('labelFilter', action.filter);
    default:
      return state
  }
}


export const todos = (state=Immutable.fromJS(initiateState.todos), action) => {
  switch (action.type) {
    case types.ADD_TODO:
      state = state.push(Immutable.fromJS(
        {
          id: action.id,
          text: action.text,
			completed: false,
			labelIds: []
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

    case types.TOGGLE_TODO:
		return state.map(todo => {
			if ( todo.get('id') === parseInt(action.id) ) {
				todo = todo.set('completed', !todo.get('completed'));
			}
			return todo;

		});

	case types.ADD_TODO_LABEL:
		return state.map(todo => {
			if ( todo.get('id') === parseInt(action.id) ) {
				if(todo.get('labelIds').indexOf(parseInt(action.label)) < 0)
				todo = todo.set('labelIds', todo.get('labelIds').push(parseInt(action.label)));
			}
			return todo;

		});

	case types.REMOVE_TODO_LABEL:
		return state.map(todo => {

			if ( todo.get('id') === parseInt(action.id) ) {
				if(todo.get('labelIds').indexOf(parseInt(action.label)) > -1)

				todo = todo.set('labelIds', todo.get('labelIds').filterNot(lbl => lbl === parseInt(action.label)));
			}

			return todo;

		});



    default:
      return state;
  }
};
