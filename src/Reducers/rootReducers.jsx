import { combineReducers } from "redux";

import auth from "./authReducer";
import calculatedInformation from "./calculatedInformation";
import general from "./general";
import personal from "./personalData";

const rootReducer = combineReducers({
  general,
  personal,
  calculatedInformation,
  auth,
});

export default rootReducer;