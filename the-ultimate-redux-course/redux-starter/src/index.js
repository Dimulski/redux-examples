import configureStore from './store/configureStore';
import { addBug, assignBug, getUnresolvedBugs, resolveBug } from './store/bugs';
import { userAdded } from './store/users';
const store = configureStore();

store.dispatch(userAdded({ name: "Georgi" }));
store.dispatch(addBug({ description: "a" }));
setTimeout(() => {
  const unresolvedBugs = getUnresolvedBugs(store.getState());
  store.dispatch(assignBug({ bugId: unresolvedBugs[0].id, userId: 1 }));
  store.dispatch(resolveBug({ bugId: unresolvedBugs[0].id }));
}, 1000);

