import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    data: null,
    username: "",
    email: "",
    password: "",
    name: "",
    loggedIn: JSON.parse(window.localStorage.getItem("loggedIn")) || false,
    isLoading: true,
    error: true,
    notifications: null,
    success: false,
}
export const userRegister = createAsyncThunk(
    "userRegister",
    async (username,email,password,name) => {
        try {
            var response = await axios.post("http://localhost:8800/api/auth/register", { username:username, email:email, password:password, name:name });
            return response.data;
        } catch (error) {
            return (error.response.data);
        }
    }
);
export const userLogin = createAsyncThunk(
    "userLogin",
    async (dataForm) => {
        try {
            var response = await axios.post("http://localhost:8800/api/auth/login", { data: dataForm });
            return response.data;
        } catch (error) {
            return (error.response.data);
        }
    }
)

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
    },
    extraReducers: (builder) => {
        builder.addCase(userRegister.pending, (state, action) => {
            state.error = false;
            state.isLoading = true;
            state.success = false;
        });
        builder.addCase(userRegister.fulfilled, (state, action) => {
            state.error = false;
            state.isLoading = true;
            state.notifications = action.payload.msg;
            state.success = true;
        });
        builder.addCase(userRegister.rejected, (state, action) => {
            state.error = true;
            state.isLoading = true;
            state.notifications = null;
            state.success = false;
        });
    }


})
export default AuthSlice.reducer;
export const { login, logout, register } = AuthSlice.actions;