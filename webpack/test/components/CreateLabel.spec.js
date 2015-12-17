import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import 'core-js/es6/object'; // Object.assign etc

import Immutable from 'immutable';
import CreateLabel from '../../components/CreateLabel';


function setup(propOverrides={}) {
  let props = Object.assign({
	labels: [{name: 'All',
				color: 'green'}
			],

    createLabel: sinon.spy()
  }, propOverrides);

  return ReactTestUtils.renderIntoDocument(<CreateLabel {...props} />);
}

describe('component', () => {

  describe('Create Label', () => {

    it("should render correctly", () => {
      let component = setup();
      let node = ReactDOM.findDOMNode(component);

      expect(node.tagName).to.equal('SPAN');
      expect(node.className).to.equal('create_label');
    });

    it("should call createLabel", () => {
      let component = setup();
      let input_node = component.refs.label_text;
      let form_node = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'form');

      expect(input_node.value).to.equal('');
      input_node.value = 'Do something useful today';
      ReactTestUtils.Simulate.change(input_node);
      expect(input_node.value).to.equal('Do something useful today');

      expect(component.props.createLabel.callCount).to.equal(0);
      ReactTestUtils.Simulate.submit(form_node);
      expect(component.props.createLabel.callCount).to.equal(1);
      expect(component.props.createLabel).to.have.been.calledWith('Do something useful today');
   });

 });
});
