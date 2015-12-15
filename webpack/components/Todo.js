import React, { PropTypes, Component } from 'react';
var ImmutableRenderMixin = require('react-immutable-render-mixin');
import { connect } from 'react-redux';
import { CompletionFilters } from '../constants/TodoConstants';

import './Todo.scss';
import cat_image from './images/Todo-cat.jpg';

var TodoLabelForm = React.createClass({
	displayName: 'LabelForm',

	mixins: [ImmutableRenderMixin],

	getInitialState(){
		return {
	    	isTodoFormVisible: false
	    };

	},

	handleFormVisibility: function(event){
		event.preventDefault();
		let todoFormVisibility = this.state.isTodoFormVisible;

		this.setState({isTodoFormVisible: !todoFormVisibility});
	},

	handleOnAddLabel: function (event){
		event.preventDefault();
		let todoID = this.refs.selectedTodoAddLabelID.value;
		let labelID = this.refs.selectedAddLabel.value
		//console.log(this.refs.selectedTodoAddLabelID.value);
		//console.log(this.refs.selectedAddLabel.value);

		this.props.onAddLabel(todoID, labelID);
		this.setState({isTodoFormVisible: false});
	},

	render () {
		const { labels, todoID } = this.props;
		let labelNames = [];
		let filteredLabels = [];
		let todoFormVisibility = this.state.isTodoFormVisible;

		labels.forEach(label => {
			labelNames.push(label.get('name'));
		});

		labels.forEach(label => {
			if(label.get('name') !== "All"){
				filteredLabels.push(
					<option value={labelNames.indexOf(label.get('name'))}>
						{label.get('name')}
					</option>
				);

			}
		});

		let labelTodoID = 'label_'+ todoID;

		return(
		<span>
			<span className="button-circle" style={{backgroundColor: todoFormVisibility? "#F75E3E": ""}} onClick={this.handleFormVisibility}>{todoFormVisibility? "--": "+"}</span>
			<form onSubmit={this.handleOnAddLabel} style={{display: todoFormVisibility? "inline-block": "none", float:'right'}} >
				<input ref="selectedTodoAddLabelID" value={todoID} style={{display:"none"}}/>
          	<select ref="selectedAddLabel">
  						{filteredLabels}
				</select>
				<button type="submit">> </button>
        </form>
       </span>
		);
	}

});

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

  handleTodoLabelDelete: function (e) {
  		let labelID = e.target.id.split('_');
  		this.props.removeTodoLabel(labelID[1], labelID[0]);
  },

  handleToggleTodo: function (e){
	  let todoID = e.target.id;
	  console.log(todoID);
	  this.props.toggleTodo(todoID);
  },

  render() {
    const { todos, labels } = this.props;


    let lists = [];
    let listLabel = [];

    	if(todos != null){
     todos.forEach(todo => {

    	if (todo.get('labelIds')) {
    	todo.get('labelIds').forEach(label => {

    		listLabel.push(<span key={label} className="todoLabel">{labels.get(label).get('name')}<span id={label+'_'+todo.get('id')} className="todoLabelDelete" onClick={this.handleTodoLabelDelete}>-</span></span>);
    		});
    	}
      lists.push(
        <li key={todo.get('id')}>
          <span id={todo.get('id')}
				//onClick={this.props.toggleTodo.bind(this, todo.get('id'))}
				onClick={this.handleToggleTodo}
				style={{
		  			textDecoration: todo.get('completed') ? 'line-through' : 'none',
		  			cursor: todo.get('completed') ? 'default' : 'pointer'
				}}
			>
					{todo.get('text')}
			</span>
			<span style={{float:'right', fontSize:'0.57em'}}>
				{listLabel}
				<TodoLabelForm todoID={todo.get('id')} labels={labels} onAddLabel={this.props.addTodoLabel}/>
			</span>

        </li>
      );
      listLabel = [];
    });
   }

    return (
      <div className="todo_list">

        <form onSubmit={this.handleOnSubmit}>
          <input ref="input_text" type="text" placeholder="Type in todos. . ."/>
        </form>
        <ul>
          {lists}
        </ul>
      </div>
    );
  }
});

module.exports = Todo;
