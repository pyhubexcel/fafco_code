import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";
import cookie from 'react-cookies'

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  data: {},
};

const CustomSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
      state.isError = false;
    },
    loginSuccess(state, action) {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.data = { ...action.payload };
    },
    logoutSuccess(state, action){
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      console.log(action, 'this is action')
      state.data = { ...action.payload };
    },
    hasError(state, action) {
      state.isError = true;
      state.isLoading = false;
      state.isSuccess = false;
      state.data = { ...action.payload };
    },
    resetReducer(state) {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.data = {};
    },
  },
});

export function customApiFunc(apiUrl,payload) {
  // console.log("payload in customSlice=====",payload)
  // console.log("payload in customSlice=====",apiUrl)

  return async (dispatch) => {
    dispatch(CustomSlice.actions.startLoading());
    try {
      const response = await axiosInstance.post(apiUrl,payload);
      console.log(response)
      if (response.data.status == "Successful") {
        // cookie.save('token', response?.data?.data?.access)
        // cookie.save('id', response?.data?.data?.id)
        // cookie.save('role', response?.data?.data?.customer_type)
        // cookie.save('name', response?.data?.data?.name)
        console.log( response?.data?.data?.name , "and",  response?.data?.data)
      }
      dispatch(CustomSlice.actions.loginSuccess(response.data));
    } catch (e) {
        console.log('error in catch====',e.response.data);
      dispatch(CustomSlice.actions.hasError(e.response.data));
    }
  };
}

export function logout(apiUrl,token){
  return async (dispatch) => {
    dispatch(CustomSlice.actions.startLoading());
    try {
      const response = await axiosInstance.get(apiUrl, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
      if(response.data.status == "Successfull"){
        cookie.remove('token')
        cookie.remove('role')
      }
      dispatch(CustomSlice.actions.logoutSuccess(response.data));
    } catch (e) {
        console.log('error in catch====',e.response.data);
      dispatch(CustomSlice.actions.hasError(e.response.data));
    }
  };
}

export const { startLoading, hasError, loginSuccess, resetReducer,logoutSuccess } = CustomSlice.actions;
export default CustomSlice.reducer;