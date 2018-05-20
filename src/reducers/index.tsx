import { combineReducers } from "redux";
import garden, { GardenState } from "./garden";
import location, { LocationState } from "./location";


export interface RootState {
  garden: GardenState;
  location: LocationState;
}

export default combineReducers<RootState>({
  garden,
  location,
});
