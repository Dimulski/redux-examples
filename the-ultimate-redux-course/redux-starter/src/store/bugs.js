import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from './api';
import moment from 'moment';

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
    bugsRequested: (bugs, action) => {
      bugs.loading = true;
    },

    bugsReceived: (bugs, action) => {
      bugs.list = action.payload;
      bugs.loading = false;
      bugs.lastFetch = Date.now();
    },

    bugsRequestFailed: (bugs, action) => {
      bugs.loading = false;
    },

    bugAdded: (bugs, action) => {
      bugs.list.push(action.payload)
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

export const {
  bugAdded,
  bugRemoved,
  bugResolved,
  bugAssigned,
  bugsReceived,
  bugsRequested,
  bugsRequestFailed
} = slice.actions;
export default slice.reducer

// Action Creators
const url = "/bugs";

// () => fn(dispatch, getState)
export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs;

  const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
  if (diffInMinutes < 10) {
    return;
  }

  dispatch(
    apiCallBegan({
      url,
      onStart: bugsRequested.type,
      onSuccess: bugsReceived.type,
      onError: bugsRequestFailed.type
    })
  );
}

export const addBug = bug => apiCallBegan({
  url,
  method: "post",
  data: bug,
  onSuccess: bugAdded.type
})

// export const loadBugs = () => apiCallBegan({
//   url,
//   onStart: bugsRequested.type,
//   onSuccess: bugsReceived.type,
//   onError: bugsRequestFailed.type
// })

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
