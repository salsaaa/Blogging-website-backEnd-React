import TYPES from "../reducers/types";

//Action Creator

export function fetchBlogs() {
  return function(dispatch) {
    fetch("http://localhost:3000/Blogs")
      .then(res => res.json())
      .then(data =>
        dispatch({
          type: TYPES.FETCH_Blogs,
          payload: data
        })
      );
  };
}
