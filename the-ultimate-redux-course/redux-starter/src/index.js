import configureStore from './store/configureStore';
import { resolveBug, assignBug, loadBugs } from './store/bugs';

const store = configureStore();

store.dispatch(loadBugs());

setTimeout(() => {
  store.dispatch(assignBug(2, 3));
}, 2000);
