import { combineReducers } from "@reduxjs/toolkit";
import UserDetails from './slices/userSlice'

const rootReducer = combineReducers({
  UserDetails,
});

export default rootReducer;
