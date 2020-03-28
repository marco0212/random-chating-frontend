import ReactDom from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import App from './containers/App/App';
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
