import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { bindActionCreators } from 'redux';

import store from './stores/TodoStore';
import Container from './containers/TodoContainer';
import * as actions from './actions/TodoActions';

if (dev_tools) {
  var reduxDevtoolsLibReact = require('redux-devtools/lib/react');
  var DevTools = reduxDevtoolsLibReact.DevTools;
  var DebugPanel = reduxDevtoolsLibReact.DebugPanel;
  var LogMonitor = reduxDevtoolsLibReact.LogMonitor;

  if (module.hot) {
    module.hot.accept('./stores/TodoReducers', () => store.replaceReducer(combineReducers(require('./stores/TodoReducers'))));
  }

  class RenderDebugPanel extends Component {
    render() {
      return (
        <DebugPanel top right bottom>
          <DevTools store={store}
                    monitor={LogMonitor}
                    visibleOnLoad={true} />
        </DebugPanel>
      );
    }
  }

  ReactDOM.render(
    <RenderDebugPanel />, document.getElementById('debug_panel')
  );
}

// bind action creators to this store
var boundActions = bindActionCreators(actions, store.dispatch);

ReactDOM.render(
  <Provider store={store}>
    <Container actions={boundActions} />
  </Provider>,
  document.getElementById('app')
);
