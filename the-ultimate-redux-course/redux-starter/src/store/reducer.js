import { combineReducers } from "redux";
import entitiesReducer from './entities';

export default combineReducers({
  entities: entitiesReducer
});

// {
//   entities: {...},
//   auth: { userId: 1, name: "John" },
//   ui: {
//     bugs: { query: "...", sortBy: "..."}
//   }
// }
