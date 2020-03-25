import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducer';

export default createStore(rootReducer, applyMiddleware(logger));
