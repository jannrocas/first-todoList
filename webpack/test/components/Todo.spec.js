/*
 ReactTestUtils

 single:

   ReactTestUtils.findRenderedDOMComponentWithClass(component, 'next_button');
   ReactTestUtils.findRenderedComponentWithType(component, ComponentName);
   ReactTestUtils.findRenderedDOMComponentWithTag(component, 'form');

 multiple:

   ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'btn');
   ReactTestUtils.findAllInRenderedTree(component, element => ReactTestUtils.isCompositeComponentWithType(element, ComponentName) && element.props.influencer.get('id') == influencer.id)[0];

 expect:

   expect(component.props.addTodo.callCount).to.equal(0);
   expect(component.props.addTodo.callCount).to.equal(1);
   expect(component.props.addTodo).to.have.been.calledWith('Walk with Jake :)');
 */

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import 'core-js/es6/object'; // Object.assign etc

import Immutable from 'immutable';
import Todo from '../../components/Todo';

function setup(propOverrides={}) {
  let props = Object.assign({
    todos: Immutable.fromJS([{id: 1, text: 'Make a coffee for Mae'}]),

    addTodo: sinon.spy()
  }, propOverrides);

  return ReactTestUtils.renderIntoDocument(<Todo {...props} />);
}

describe('component', () => {

  describe('Todo', () => {

    it("should render correctly", () => {
      let component = setup();
      let node = ReactDOM.findDOMNode(component);

      expect(node.tagName).to.equal('DIV');
      expect(node.className).to.equal('todo_list');
    });

    it("should call addTodo", () => {
      let component = setup();
      let input_node = component.refs.input_text;
      let form_node = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'form');

      expect(input_node.value).to.equal('');
      input_node.value = 'Do something useful today';
      ReactTestUtils.Simulate.change(input_node);
      expect(input_node.value).to.equal('Do something useful today');

      expect(component.props.addTodo.callCount).to.equal(0);
      ReactTestUtils.Simulate.submit(form_node);
      expect(component.props.addTodo.callCount).to.equal(1);
      expect(component.props.addTodo).to.have.been.calledWith('Do something useful today');
    });
  });
});
