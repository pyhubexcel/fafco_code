import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  data: {},
};

const logOutSlice = createSlice({
  name: "logout",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
      state.isError = false;
    },
    logOutSuccess(state, action) {
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


export const logOutUser = (token) => async (dispatch) => {
  dispatch(logOutSlice.actions.startLoading());
  try {
    const response = await axiosInstance.get("api/auth/logout/", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    dispatch(logOutSuccess(response.data));
  } catch (e) {
    dispatch(hasError(e));
  }
};
export const { startLoading, hasError, logOutSuccess, resetReducer } = logOutSlice.actions;
export default logOutSlice.reducer;
