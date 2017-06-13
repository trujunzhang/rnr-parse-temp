import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './store/configureStore';
import createRoutes from './routes';

var Parse = require('parse');


Parse.initialize('zU5955fjYoDbG1EC0wY9RUb8zZYDtbivvUGuWZMv', 'plSHPsAIDM6qRtcnXR0zmUi9YQCxd58FcYjfUNUY');

Parse.serverURL = `http://localhost:1337/parse`;

import './index.css';

const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store);

const routes = createRoutes(store);

ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes} history={history} />
  </Provider>,
  document.getElementById('root')
);
