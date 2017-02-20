import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import App from './components/AppView';
import thunk from 'redux-thunk';
// import './styles/App.css';

const store = createStore(reducer, applyMiddleware(thunk))

// Render the main component into the dom
ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>
  ,document.getElementById('app')
);