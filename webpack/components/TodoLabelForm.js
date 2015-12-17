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
					<option key={labelNames.indexOf(label.get('name'))} value={labelNames.indexOf(label.get('name'))} readOnly>
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
				<input ref="selectedTodoAddLabelID" value={todoID} readOnly style={{display:"none"}}/>
          	<select ref="selectedAddLabel">
  						{filteredLabels}
				</select>
				<button type="submit">> </button>
        </form>
       </span>
		);
	}

});