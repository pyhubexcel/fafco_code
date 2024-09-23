import { combineReducers } from "@reduxjs/toolkit";
import LoginSlice from "../slices/LoginSlice";
import RegisterSlice from "../slices/RegisterSlice"
import logOutSlice from "../slices/LogoutSlice";

const rootReducer = combineReducers({
    LoginSlice : LoginSlice,
    logOutSlice : logOutSlice,
    RegisterSlice : RegisterSlice,
})

export default rootReducer