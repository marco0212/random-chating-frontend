import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import rootReducer from "../reducer";
import thunk from 'redux-thunk';

const logger = createLogger();

export default createStore(rootReducer, applyMiddleware(logger, thunk));
