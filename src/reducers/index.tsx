import { combineReducers } from "redux";
import garden, { GardenState } from "./garden";
import task, { TaskState } from "./task";

export interface RootState {
  garden: GardenState;
  task: TaskState;
}

export default combineReducers<RootState>({
  garden,
  task,
});
