import { combineReducers } from "redux";
import garden, { GardenState } from "./garden";

export interface RootState {
  garden: GardenState;
}

export default combineReducers<RootState>({
  garden,
});
