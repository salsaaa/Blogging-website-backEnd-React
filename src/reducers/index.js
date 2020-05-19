import { combineReducers } from "redux";
import BlogsReducer from "./BlogsReducer";

//Root Reducer
export default combineReducers({
  blogs: BlogsReducer
});
