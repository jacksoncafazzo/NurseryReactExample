import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import createLogger from 'redux-logger';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import rootReducer from './components/reducers';

import './index.css';
import routes from './routes';

const logger = createLogger();

function createStoreWithMiddleware(rootReducer, previousState) {
  return createStore(
    rootReducer,
    previousState,
    applyMiddleware(thunk, ReduxPromise, logger)
  );
}

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(rootReducer)}>
  <Router history={browserHistory} routes={routes} />
  </Provider>,

  document.getElementById('root')
);
