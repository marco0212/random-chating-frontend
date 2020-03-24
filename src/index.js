import ReactDom from 'react-dom';
import React from 'react';
import App from './containers/App';
import { Provider } from 'react-redux';
import store from './store';
import GlobalStyle from './components/GlobalStyle/GlobalStyle';
import 'reset-css';

ReactDom.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>,
  document.getElementById('root')
);
