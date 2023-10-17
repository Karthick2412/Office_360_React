import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../reducers/AuthReducer";

const Store=configureStore({
    reducer:{
        login:loginReducer,
    }
});

export default Store;