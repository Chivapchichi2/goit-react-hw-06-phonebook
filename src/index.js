import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import 'modern-normalize/modern-normalize.css';
import './index.css';
import store from './redux/store';

/* eslint no-undef: "error" */
/* eslint-env browser */

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
