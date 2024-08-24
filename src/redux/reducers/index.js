import { combineReducers } from "redux";
import authReducer from "./authReducer";
import csvReducer from "./csvReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  csv: csvReducer,
});

export default rootReducer;
