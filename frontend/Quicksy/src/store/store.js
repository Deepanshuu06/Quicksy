import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice.js";

const store = configureStore({
    reducer:{
        auth:auth
    }
})

export default store;