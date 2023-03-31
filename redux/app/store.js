import { configureStore, combineReducers } from "@reduxjs/toolkit";
import coordinator_Reducer from "../features/coordinator/coordinator_slice";
import userReducer from "../features/user/userSlice";
import studentReducer from "../features/student/studentSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createAction } from "@reduxjs/toolkit";
import supervisorReducer from "../features/supervisor/supervisorSlice";
import projectReducer from "../features/project/projectSlice";
import superAdminReducer from "../features/superAdmin/superAdminSlice";
import presentationReducer from "../features/presentations/presentationSlice";
import panelReducer from "../features/panel/panelSlice";
import employeeReducer from "../features/employee/employeeSlice";
export const signOut2 = createAction("user/signOut");

const rootReducer = combineReducers({
  coordinator: coordinator_Reducer,
  user: userReducer,
  supervisor: supervisorReducer,
  student: studentReducer,
  project: projectReducer,
  superAdmin: superAdminReducer,
  presentation: presentationReducer,
  panel: panelReducer,
  employee: employeeReducer,
});
const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);
export default store;
