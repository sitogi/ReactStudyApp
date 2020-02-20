import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';

import App from 'App';
import * as serviceWorker from 'serviceWorker';
import store from 'store';

import './styles/semantic.min.css';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <DndProvider backend={Backend}>
        <App />
      </DndProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement,
);

serviceWorker.unregister();
