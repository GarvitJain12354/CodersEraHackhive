import { configureStore } from "@reduxjs/toolkit";
import Auth from "@/store/Reducer/AuthReducer";
export const store = configureStore({
  reducer: {
    Auth,
  },
});
