import React, { Component, PropTypes } from 'react'
var ImmutableRenderMixin = require('react-immutable-render-mixin');

import { CompletionFilters } from '../constants/TodoConstants';

const { SHOW_ALL } = CompletionFilters;

import './Todo.scss';

var VisibilityFilters = React.createClass({
	displayName: 'Visibility Filters',

  mixins: [ImmutableRenderMixin],

  getInitialState() {
    return {};
  },

  handleCompletion(){

	let notDone = this.refs.notDone.checked;
	let done = this.refs.done.checked;
	if (done) {
		if (notDone) {this.props.handleCompletion(CompletionFilters.SHOW_ALL);}
		else {this.props.handleCompletion(CompletionFilters.SHOW_COMPLETED);}
	}
	else{
		if (notDone) {this.props.handleCompletion(CompletionFilters.SHOW_ACTIVE);}
		else {this.props.handleCompletion(CompletionFilters.SHOW_NONE);}
	}
  },

  handleLabelChange(){
  		let selectedLabel = this.refs.lbl.value;

  		this.props.handleLabel(selectedLabel);

  },

  render() {
	const { labels } = this.props;
  	let allLabels = [];

   labels.forEach(label => {
  		return (
  			allLabels.push(<option key={label.get('name')} >{label.get('name')}</option>)
  		)
	});

    return (
    	<span style={{width:'30em', margin:'0em 1em'}}>
			<span style={{display:'inline-block', position:'relative', margin:'0em 1em'}}>
				<form onClick={this.handleCompletion}>
					<label><input type="checkbox" defaultChecked={true} ref="notDone"/>Not Done</label>
					<label><input type="checkbox" defaultChecked={true} ref="done"/>Done</label>
				</form>
			</span>
			<span style={{display:'inline-block', position:'relative'}}>
				<select defaultValue='All' ref="lbl" onClick={this.handleLabelChange}>
  						{allLabels}
				</select>
			</span>
      </span>
    )
  }


});

module.exports = VisibilityFilters;
