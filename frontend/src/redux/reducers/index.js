import { combineReducers } from "@reduxjs/toolkit";
import CustomSlice from "../slices/CustomSlice";
// import SignUpSlice from "./SignUpSlice";
// import loginSlice from './LoginSlice'
// import AdminSlice from "./AdminSlice";
// import AddPollSlice from "./AddPollSlice";
// import DeletePollSlice from "./DeletePollSlice";
// import DeleteOptionSlice from "./DeleteOptionSlice";
// import AddOptionSlice from "./AddOptionSlice";
// import EditPollSlice from "./EditPollSlice";
// import VoteSlice from "./VoteSlice";

const rootReducer = combineReducers({
    // SignUpSlice : SignUpSlice,
    // loginSlice : loginSlice,
    // AdminSlice : AdminSlice,
    // AddPollSlice : AddPollSlice,
    // AddOptionSlice : AddOptionSlice,
    // DeletePollSlice : DeletePollSlice,
    // DeleteOptionSlice : DeleteOptionSlice,
    // OptionsSlice : EditPollSlice,
    // VoteSlice : VoteSlice,
    CustomSlice : CustomSlice,
})

export default rootReducer