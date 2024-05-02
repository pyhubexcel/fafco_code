import { combineReducers } from "@reduxjs/toolkit";
import CustomSlice from "../slices/CustomSlice";
import LoginSlice from "../slices/LoginSlice";
import RegisterSlice from "../slices/RegisterSlice"
import logOutSlice from "../slices/LogoutSlice";

const rootReducer = combineReducers({
    CustomSlice : CustomSlice,
    LoginSlice : LoginSlice,
    logOutSlice : logOutSlice,
    RegisterSlice : RegisterSlice,
})

export default rootReducer