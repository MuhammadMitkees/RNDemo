import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

const loggerMiddleware = (storeAPI) => (next) => (action) => {
  const result = next(action);
  console.log("Middleware: State after dispatch", storeAPI.getState());
  return result;
};

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});

export default store;
