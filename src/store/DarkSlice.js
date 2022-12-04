import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    darkMode: JSON.parse(window.localStorage.getItem("darkMode")) || false
}
const DarkSlice = createSlice({
    name: "dark",
    initialState,
    reducers: {
        setDarkMode: (state, action) => {
            state.darkMode = action.payload;
            window.localStorage.setItem("darkMode", JSON.stringify(state.darkMode))
        }

    }
})
export default DarkSlice.reducer;
export const {  setDarkMode } = DarkSlice.actions;