// src/reducers/index.js
import { combineReducers } from "redux";
import general from "./general";
import personal from "./personalData";
import calculatedInformation from "./calculatedInformation";
import auth from "./authReducer"; // Import the auth reducer

export default combineReducers({
    general,
    personal,
    calculatedInformation,
    auth, // Add the auth reducer here
});
