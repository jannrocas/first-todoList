import React, { Component, PropTypes } from 'react'
var ImmutableRenderMixin = require('react-immutable-render-mixin');


import './Todo.scss';

var CreateLabel = React.createClass({
	displayName: 'AddLabels',

  mixins: [ImmutableRenderMixin],

  getInitialState() {
    return {};
  },

  handleCreateLabel(event) {
    event.preventDefault();
    let input = this.refs.label_text;

    if (input.value.length > 0) {
      this.props.createLabel(input.value);
      input.value = '';
    }
  },

  render() {
    return (
    	<span className='create_label' style={{display:'inline-block', position:'relative'}}>
			<form onSubmit={this.handleCreateLabel}>
          <input ref="label_text" type="text" placeholder="Create new label"/>
          <button type="submit">Create Label </button>
        </form>
      </span>
    )
  }


});

module.exports = CreateLabel;
