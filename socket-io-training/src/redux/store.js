import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';
import logger from 'redux-logger';

const store = configureStore({ reducer: rootReducer }, composeWithDevTools(applyMiddleware(logger)));

export default store;
