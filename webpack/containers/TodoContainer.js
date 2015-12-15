import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Todo from '../components/Todo';
import CreateLabel from '../components/CreateLabel';
import VisibilityFilters from '../components/VisibilityFilters';
import * as TodoActions from '../actions/TodoActions';
var ImmutableRenderMixin = require('react-immutable-render-mixin');
import { CompletionFilters } from '../constants/TodoConstants';

const { SHOW_ALL } = CompletionFilters;

var TodoContainer = React.createClass({
  displayName: 'TodoContainer',

  mixins: [ImmutableRenderMixin],

  getInitialState() {
    return {
			completionFilter: SHOW_ALL,
			labelFilter: 'All'
    };
  },

  handleCompletion: function(filter) {
      // this.setState({completionFilter: filter});
      this.props.actions.setcompletionFilter(filter);
  },

   handleLabel: function(filter) {
      // this.setState({labelFilter: filter});
      this.props.actions.setLabelFilter(filter);
  },

  selectTodos(todos, compFilter, labels, labelFilter) {
  		var tempTodos = {};
  		let labelNames = [];

  		switch (compFilter) {
    		case CompletionFilters.SHOW_ALL:

      	tempTodos = todos;

      		break;
    		case CompletionFilters.SHOW_COMPLETED:

      		tempTodos = todos.filter(todo => (todo.get('completed') == true));

      		break;
    		case CompletionFilters.SHOW_ACTIVE:
      		tempTodos = todos.filter(todo => (todo.get('completed') == false));
      		break;
      	default:
      		return null;
  		}

		labels.forEach(label => {
  			labelNames.push(label.get('name'));
  		});

		if(labelFilter !== 'All'){
      	tempTodos = tempTodos.filter(todo=> ((todo.get('labelIds').indexOf(labelNames.indexOf(labelFilter))) > -1));
  		}
  		return tempTodos;
	},

  render() {
    const { visibilityFilter, todos, labels, dispatch } = this.props;

    //var visibleTodos = this.selectTodos(todos, this.state.completionFilter, labels, this.state.labelFilter);
      var visibleTodos = this.selectTodos(todos, this.props.visibilityFilter.get('completionFilter'), labels, this.props.visibilityFilter.get('labelFilter'));
    return (
		<div style={{width: '80%'}}>

			<div id="header" style={{textAlign:'center', marginTop:'13em'}}>
				<h1 style={{display:'inline-block', position:'relative' , margin:'0em 0.7em'}}>Todo</h1>
    			<CreateLabel style={{display:'inline-block', position:'relative'}} labels={labels} {...bindActionCreators(TodoActions, dispatch)} />

    			<VisibilityFilters handleLabel={this.handleLabel} labels={labels}  handleCompletion={this.handleCompletion} style={{display:'inline-block', position:'relative'}} visibilityFilter={this.state} {...bindActionCreators(TodoActions, dispatch)} />
 			</div>

      	<Todo
      		todos={visibleTodos} labels={labels} completionFilter={this.state.completionFilter}
        		{...bindActionCreators(TodoActions, dispatch)}
 			/>
 		</div>
    );
  }
});

function mapStateToProps(state) {

  return {
    todos: state.todos,
    visibilityFilter: state.visibilityFilter,
    labels: state.labels
  };
}

export default connect(mapStateToProps)(TodoContainer);
