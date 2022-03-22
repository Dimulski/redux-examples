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

import configureStore from './store/configureStore';
// import * as actions from './store/bugs';
import * as actions from './store/projects';

const store = configureStore();

store.subscribe(() => {
  console.log("Store changed");
});

// store.dispatch(actions.bugAdded({ description: "Bug 1" }));
// store.dispatch(actions.bugAdded({ description: "Bug 2" }));
// store.dispatch(actions.bugAdded({ description: "Bug 3" }));
// store.dispatch(actions.bugRemoved({ id: 3 }));
// store.dispatch(actions.bugResolved({ id: 1 }));

store.dispatch(actions.projectAdded({ name: "Project 1" }));
store.dispatch(actions.projectAdded({ name: "Project 2" }));
store.dispatch(actions.projectRemoved({ id: 3 }));

console.log(store.getState());
