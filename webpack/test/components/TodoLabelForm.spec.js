









 describe('TodoLabelForm', () => {

    it("should render correctly", () => {
      let component = setupLabel();
      let node = ReactDOM.findDOMNode(component);

      console.log(node);
      expect(node.tagName).to.equal('SPAN');
    });

  });