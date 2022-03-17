import { createStore } from 'redux';
import reducer from './reducer';

const store = createStore(reducer) // createStore is a HOF

export default store;
