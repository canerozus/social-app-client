import axios from "axios";

export const makeRequest = axios.create({
baseURL:"http://localhost:8800/api/",
withCredentials:true,
})
// baseURL:"https://social-caner-backend.herokuapp.com/api/",
// withCredentials:true,
// baseURL:"http://localhost:8800/api/",
// withCredentials:true,