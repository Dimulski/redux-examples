// import store from './store';
// import { bugAdded, bugRemoved, bugResolved } from './actions';

// const unsubscribe = store.subscribe(() => {
//   console.log('Store changed', store.getState())
// })

// store.dispatch(bugAdded('Bug1'));
// store.dispatch(bugAdded('Bug2'));
// store.dispatch(bugAdded('Bug3'));
// store.dispatch(bugAdded('Bug4'));
// store.dispatch(bugResolved(3));

// // unsubscribe();

// store.dispatch(bugRemoved(1))
// console.log(store.getState());


// import { Map } from 'immutable';

// let book = { title: "2001: A Space Odyssey" };
// let bookMap = Map(book);

// function publish(book) {
//   return book.set("isPublished", true);
// }

// bookMap = publish(bookMap);

// console.log(book);
// console.log(bookMap.get("title"))
// console.log(bookMap.get("isPublished"))
// console.log(bookMap.toJS())


// import { produce } from 'immer';

// let book = { title: "2001: A Space Odyssey" };

// function publish(book) {
//   return produce(book, draftBook => {
//     draftBook.isPublished = true;
//   })
// }

// let updated = publish(book);

// console.log(book);
// console.log(updated);


// import store from './customStore';
// import * as actions from './actions'

// store.subscribe(() => {
//   console.log("Store changed")
// })

// store.dispatch(actions.bugAdded("Bug 1"))

// console.log(store.getState())

// import configureStore from './store/configureStore';
// import { bugAdded, bugResolved, getUnresolvedBugs } from './store/bugs';
// import { projectAdded } from './store/projects';


// const store = configureStore();

// store.subscribe(() => {
//   console.log("Store changed");
// });

// store.dispatch(projectAdded({ name: "Project 1" }));
// store.dispatch(bugAdded({ description: "Bug 1"}));
// store.dispatch(bugAdded({ description: "Bug 2"}));
// store.dispatch(bugAdded({ description: "Bug 3"}));
// store.dispatch(bugResolved({ id: 1 }));

// const x = getUnresolvedBugs(store.getState());
// const y = getUnresolvedBugs(store.getState());

// console.log(x === y);


// import configureStore from './store/configureStore';
// import { bugAdded, bugResolved, bugAssigned, getBugsByUser } from './store/bugs';
// import { projectAdded } from './store/projects';
// import { userAdded } from './store/users';

// const store = configureStore();

// store.dispatch(projectAdded({ name: "Project 1" }));
// store.dispatch(bugAdded({ description: "Bug 1"}));
// store.dispatch(bugAdded({ description: "Bug 2"}));
// store.dispatch(bugAdded({ description: "Bug 3"}));
// store.dispatch(bugAdded({ description: "Bug 4"}));
// store.dispatch(bugAdded({ description: "Bug 5"}));
// store.dispatch(bugResolved({ id: 1 }));
// store.dispatch(userAdded({ name: "Georgi" }));
// store.dispatch(userAdded({ name: "Shéyaa" }));
// store.dispatch(bugAssigned({ bugId: 1, userId: 1 }))
// store.dispatch(bugAssigned({ bugId: 2, userId: 1 }))
// store.dispatch(bugAssigned({ bugId: 2, userId: 2 }))
// store.dispatch(bugAssigned({ bugId: 3, userId: 2 }))
// store.dispatch(bugAssigned({ bugId: 4, userId: 2 }))
// store.dispatch(bugAssigned({ bugId: 5, userId: 2 }))

// const x = getBugsByUser(1)(store.getState())
// const y = getBugsByUser(2)(store.getState())

// console.log(x);
// console.log(y);


// Dispatching functions
import configureStore from './store/configureStore';
const store = configureStore();

store.dispatch((dispatch, getState) => {
  // Call an API
  // When the promise is resolved => dispatch();
  dispatch({ type: 'bugsReceived', bugs: [1, 2, 3] })
  console.log(getState())
  // If the promise is rejected => dispatch();

});
