import React from 'react';

import './index.css';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ModalProvider } from "./context/Modal";

import configureStore from './store';
import { csrfFetch } from './store/csrf'; //restoreCSRF to be put back;
import * as sessionActions from './store/session';
import * as notebookActions from './store/notebook';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
  window.notebookActions = notebookActions;
}

function Root() {
  return (
    <Provider store={store}>
      <ModalProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ModalProvider>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root/>
  </React.StrictMode>,
  document.getElementById('root')
);
