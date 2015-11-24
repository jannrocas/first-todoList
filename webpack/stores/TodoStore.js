import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import * as TodoReducers from './TodoReducers';

let finalCreateStore;

if (dev_tools) {
  var reduxDevtools = require('redux-devtools');
  var devTools = reduxDevtools.devTools;
  var persistState = reduxDevtools.persistState;

  var reduxDevtoolsLibReact = require('redux-devtools/lib/react');
  var DevTools = reduxDevtoolsLibReact.DevTools;
  var DebugPanel = reduxDevtoolsLibReact.DebugPanel;
  var LogMonitor = reduxDevtoolsLibReact.LogMonitor;

  finalCreateStore = compose(
    applyMiddleware(thunk),
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore);
} else {
  finalCreateStore = compose(
    applyMiddleware(thunk)
  )(createStore);
}

const reducer = combineReducers(TodoReducers);
const store = finalCreateStore(reducer);

export default store;
