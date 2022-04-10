import { configureStore } from '@reduxjs/toolkit';
import reducer from  './reducer';
import logger from './middleware/logger';
import errorToast from './middleware/errorToast';

export default function() {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => [
      ...getDefaultMiddleware(),
      logger({ destination: "console" }),
      errorToast
    ]
  });
};

// Without redux-toolkit
// import { createStore, applyMiddleware } from 'redux';
// import reducer from './reducer';

// const store = createStore(reducer, applyMiddleware(logger));