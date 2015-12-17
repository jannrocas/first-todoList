import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import 'core-js/es6/object'; // Object.assign etc

import Immutable from 'immutable';
import VisibilityFilters from '../../components/VisibilityFilters';


function setup(propOverrides={}) {
  let props = Object.assign({
	labels: Immutable.fromJS([{name: 'All',
				color: 'green'}
			]),

    handleLabel: sinon.spy(),
    handleCompletion: sinon.spy()
  }, propOverrides);

  return ReactTestUtils.renderIntoDocument(<VisibilityFilters {...props} />);
}

describe('component', () => {

  describe('Visibility Filters', () => {

    it("should render correctly", () => {
      let component = setup();
      let node = ReactDOM.findDOMNode(component);

      expect(node.tagName).to.equal('SPAN');
      //expect(node.className).to.equal('create_label');
    });

    it("should call change Filter", () => {
      let component = setup();
      let input_node = component.refs.notDone;
      let form_node = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'form');

      expect(input_node.checked).to.equal(true);
      input_node.checked = false;
      ReactTestUtils.Simulate.change(input_node);
      expect(input_node.checked).to.equal(false);

      expect(component.props.handleCompletion.callCount).to.equal(0);
      ReactTestUtils.Simulate.click(form_node);
      expect(component.props.handleCompletion.callCount).to.equal(1);
   });

   it('should handle label filter change', () => {
      let component = setup({labels:Immutable.fromJS([{name:'All',color:'green'},{name:'Work',color:'blue'}])});
      let input_node = component.refs.lbl;
      let form_node = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'select');

      expect(input_node.value).to.equal('All');
      input_node.value = 'Work';
      ReactTestUtils.Simulate.click(input_node);
      expect(input_node.value).to.equal('Work');

      expect(component.props.handleLabel.callCount).to.equal(1);
      ReactTestUtils.Simulate.click(form_node);
      expect(component.props.handleLabel.callCount).to.equal(2);

   });

 });
});
