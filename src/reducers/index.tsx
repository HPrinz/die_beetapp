import { combineReducers } from "redux";
import garden, { GardenState } from "./garden";
import location, { LocationState } from "./location";
import task, { TaskState } from "./task";

export interface RootState {
  location: LocationState;
  garden: GardenState;
  task: TaskState;
}

export default combineReducers<RootState>({
  garden,
  location,
  task,
});
