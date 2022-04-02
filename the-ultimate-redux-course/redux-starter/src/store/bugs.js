import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

let lastId = 0;

const slice = createSlice({
  name: 'bugs',
  initialState: [],
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
    bugAdded: (bugs, action) => {
      bugs.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
        assignee: null
      })
    },

    bugRemoved: (bugs, action) => {
      const index = bugs.findIndex(bug => bug.id === action.payload.id);
      bugs.splice(index, 1)
    },

    bugResolved: (bugs, action) => {
      const index = bugs.findIndex(bug => bug.id === action.payload.id);
      bugs[index].resolved = true;
    },

    bugAssigned: (bugs, action) => {
      const index = bugs.findIndex(bug => bug.id === action.payload.bugId);
      bugs[index].assignee = action.payload.userId;
    },
  }
})

// console.log(slice);

export const { bugAdded, bugRemoved, bugResolved, bugAssigned } = slice.actions;
export default slice.reducer

// Selector function
// export const getUnresolvedBugs = (state) => {
//   return state.entities.bugs.filter(bug => !bug.resolved);
// }

// Memoization - technique for optimizing expensive functions
export const getUnresolvedBugs = createSelector(
  state => state.entities.bugs,
  state => state.entities.projects,
  (bugs, projects) => bugs.filter(bug => !bug.resolved)
)

export const getBugsAssignedToUser = createSelector(
  [
    state => state.entities.bugs,
    state => state.entities.users,
    (state, userId) => userId
  ],
  (bugs, users, userId) => {
    if (!users.find(user => user.id === userId)) {
      return [];
    }
    
    return bugs.filter(bug => bug.assignee === userId)
  }
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
