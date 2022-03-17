import store from './store';
import { bugAdded, bugRemoved, bugResolved } from './actions';

const unsubscribe = store.subscribe(() => {
  console.log('Store changed', store.getState())
})

store.dispatch(bugAdded('Bug1'));
store.dispatch(bugAdded('Bug2'));
store.dispatch(bugAdded('Bug3'));
store.dispatch(bugAdded('Bug4'));
store.dispatch(bugResolved(3));

// unsubscribe();

store.dispatch(bugRemoved(1))

console.log(store.getState());