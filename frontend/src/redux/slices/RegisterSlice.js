import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  data: {},
};

const RegisterSlice = createSlice({
  name: "register",
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

export function register(payload) {
  return async (dispatch) => {
    dispatch(RegisterSlice.actions.startLoading());
    try {
      const response = await axiosInstance.post("api/auth/signup/", payload);
      console.log(response, 'resssssssssss')
      dispatch(RegisterSlice.actions.loginSuccess(response.data));
      localStorage.setItem("registerdMail", payload?.email);
    } catch (e) {
      console.log(e.response, 'res in catch')
      // if (e?.response?.data?.phone[0]) {
      //   toast.error(e.response.data.phone[0])
      // }
      // if (e?.response?.data?.email[0]) {
      //   toast.error(e.response.data.email[0]);
      // }


      dispatch(RegisterSlice.actions.hasError(e));
    }
  };
}
export const { startLoading, hasError, loginSuccess, resetReducer } = RegisterSlice.actions;
export default RegisterSlice.reducer;