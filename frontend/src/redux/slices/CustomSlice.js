import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";
import cookie from 'react-cookies'
import { toast } from "react-toastify";

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
    logoutSuccess(state, action) {
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

export function customApiFunc(apiUrl, payload) {

  return async (dispatch) => {
    dispatch(CustomSlice.actions.startLoading());
    try {
      const response = await axiosInstance.post(apiUrl, payload);
      console.log(response)
      if (response.data.status == "Successful") {
        localStorage.setItem("username", payload.email)
        toast.success("Registration Successful");
      }

      if (response.data.message == "Login successfully") {
        cookie.save('token', response?.data?.data?.access)
        cookie.save('id', response?.data?.data?.id)
        cookie.save('role', response?.data?.data?.customer_type)
        cookie.save('name', response?.data?.data?.name)
        toast.success(response.data.message);
      }

      if (response.data.message == "Invalid username or password or (Please check your email for verification)") {
        toast.error('Invalid username or password')
      }

      // if (response.data.email) {
      //   toast.error(response.data.email[0]);
      // }
      // if (response.data.phone) {
      //   toast.error(response.data.phone[0]);
      // }

      dispatch(CustomSlice.actions.loginSuccess(response.data));
    } catch (e) {
      if (e.response.data.email) {
        toast.error(e.response.data.email[0]);
      }
      if (e.response.data.phone) {
        toast.error(e.response.data.phone[0]);
      }
      if (e.response.data.non_field_errors) {
        toast.error(e.response.data.non_field_errors[0]);
      }

      if (e.response.status == 400) {
        toast.error(e.response.data.message)
      }
      console.log('error in catch====', e);
      dispatch(CustomSlice.actions.hasError(e.response.data));
    }
  };
}

export function logout(apiUrl, token) {
  return async (dispatch) => {
    dispatch(CustomSlice.actions.startLoading());
    try {
      const response = await axiosInstance.get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      if (response.data.status == "Successfull") {
        cookie.remove('token')
        cookie.remove('role')
      }
      dispatch(CustomSlice.actions.logoutSuccess(response.data));
    } catch (e) {
      console.log('error in catch====', e.response.data);
      dispatch(CustomSlice.actions.hasError(e.response.data));
    }
  };
}

export const { startLoading, hasError, loginSuccess, resetReducer, logoutSuccess } = CustomSlice.actions;
export default CustomSlice.reducer;