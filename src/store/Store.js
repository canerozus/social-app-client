import { configureStore } from "@reduxjs/toolkit";

import DarkSlice from "./DarkSlice";

export const store = configureStore({
    reducer: {
        dark: DarkSlice,
    },
})

