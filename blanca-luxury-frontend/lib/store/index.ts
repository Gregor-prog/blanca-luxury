import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./baseApi";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefault) =>
    getDefault().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Re-export all hooks so pages import from one place
export * from "./authApi";
export * from "./productsApi";
export * from "./projectsApi";
export * from "./categoriesApi";
export * from "./showroomsApi";
export * from "./inquiriesApi";
export * from "./adminsApi";
