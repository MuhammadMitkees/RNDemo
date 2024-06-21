import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import themeReducer from "./themeSlice";

const loggerMiddleware = (storeAPI) => (next) => (action) => {
  const result = next(action);
  return result;
};

const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});

export default store;
