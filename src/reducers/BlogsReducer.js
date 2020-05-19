import TYPES from "./types";

// How to change state(store) => POSTS

//Initial State
const initialState = {
  Blogs: [],
  
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TYPES.FETCH_Blogs:
      return {
        ...state,
        Blogs: action.payload
      };


    default:
      return state;
  }
}
