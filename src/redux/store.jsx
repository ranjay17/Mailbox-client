import { configureStore } from "@reduxjs/toolkit";
import mailReducer from "./mailSlice";
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    mail: mailReducer,
    user: userReducer,
  },
});

export default store;
