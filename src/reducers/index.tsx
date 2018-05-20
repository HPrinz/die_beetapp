import { combineReducers } from "redux";
import gardenState, { GardenState } from "./GardenReducer";

export interface RootState {
  gardenState: GardenState;
}

export default combineReducers<RootState>({
  gardenState
});
