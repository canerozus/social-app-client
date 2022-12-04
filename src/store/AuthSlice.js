import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    id: 1,
    name: "Henry Walker",
    username: "deneme",
    password: "123456",
    profilePic: "https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600",
    loggedIn: JSON.parse(window.localStorage.getItem("loggedIn")) || false
}
const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            if (
                action.payload.username === state.username &&
                action.payload.password === state.password 
            ) {
                state.loggedIn = true;
                window.localStorage.setItem("loggedIn", JSON.stringify(state.loggedIn));
            }
        },
        logout: (state, action) => {
            state.loggedIn = false;
            window.localStorage.removeItem("loggedIn")
        }
    }


})
export default AuthSlice.reducer;
export const {login, logout} = AuthSlice.actions;