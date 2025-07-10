import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // Correct import for local storage
import { persistStore, persistReducer } from "redux-persist"; // Ensure correct import
import authReducer from "./features/authSlice";
import { baseApi } from "./api/baseApi"; // Ensure correct import

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "accessToken", "isAuthenticated"], // Ensure these are included
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      baseApi.middleware
    ),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
