import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import DarkSlice from "./DarkSlice";

export const store = configureStore({
    reducer: {
        auth: AuthSlice,
        dark: DarkSlice,
    },
})

