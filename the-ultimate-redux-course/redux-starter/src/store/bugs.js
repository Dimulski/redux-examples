import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from './api';

let lastId = 0;

const slice = createSlice({
  name: 'bugs',
  initialState: {
    list: [],
    loading: false,
    lastFetch: null
  },
  // {
  //   byId: {
  //     1: { ... },
  //     2: { ... },
  //     3: { ... },
  //   },
  //   allIds: [3, 1, 2]
  // }

  reducers: {
    // actions => action handlers
    bugsReceived: (bugs, action) => {
      bugs.list = action.payload;
    },

    bugAdded: (bugs, action) => {
      bugs.list.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
        userId: null
      })
    },

    bugRemoved: (bugs, action) => {
      const index = bugs.list.findIndex(bug => bug.id === action.payload.id);
      bugs.list.splice(index, 1)
    },

    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex(bug => bug.id === action.payload.id);
      bugs.list[index].resolved = true;
    },

    bugAssigned: (bugs, action) => {
      const { bugId, userId } = action.payload;
      const index = bugs.list.findIndex(bug => bug.id === bugId);
      bugs.list[index].userId = userId;
    },
  }
})

// console.log(slice);

export const { bugAdded, bugRemoved, bugResolved, bugAssigned, bugsReceived } = slice.actions;
export default slice.reducer

// Action Creators
const url = "/bugs";

export const loadBugs = () => apiCallBegan({
  url,
  onSuccess: bugsReceived.type,
})

// Selector function
// export const getUnresolvedBugs = (state) => {
//   return state.entities.bugs.filter(bug => !bug.resolved);
// }

// Memoization - technique for optimizing expensive functions
// bugs => get unresolved bugs from the cache
export const getUnresolvedBugs = createSelector(
  state => state.entities.bugs,
  state => state.entities.projects,
  (bugs, projects) => bugs.filter(bug => !bug.resolved)
)

export const getBugsByUser = userId => createSelector(
  state => state.entities.bugs,
  bugs => bugs.filter(bug => bug.userId === userId)
)

// Action creators
// export const bugAdded = createAction("bugAdded");
// export const bugRemoved = createAction("bugRemoved");
// export const bugResolved = createAction("bugResolved");

// // Reducer
// let lastId = 0;

// export default createReducer([], {
//   // key: value
//   // actions: functions (event => event handler)
//   [bugAdded.type]: (bugs, action) => {
//     bugs.push({
//       id: ++lastId,
//       description: action.payload.description,
//       resolved: false
//     })
//   },

//   // bugRemoved: (bugs, action) => {
//   //   const index = bugs.filter(bug => bug.id === action.payload.id);
//   //   bugs[index].resolved = true;
//   // },

//   [bugResolved.type]: (bugs, action) => {
//     const index = bugs.findIndex(bug => bug.id === action.payload.id);
//     bugs[index].resolved = true;
//   }
// });

// export default function reducer(state = [], action) {
//   switch (action.type) {
//     case bugAdded.type:
//       return [
//         ...state,
//         {
//           id: ++lastId,
//           description: action.payload.description,
//           resolved: false
//         }
//       ];

//     case bugRemoved.type:
//       return state.filter(bug => bug.id !== action.payload.id);

//     case bugResolved.type:
//       return state.map(bug => bug.id !== action.payload.id ? bug : { ...bug, resolved: true });

//     default:
//       return state;
//   }
// }
