import * as constants from "../constants";
import { OtherActionResponse } from "./action.type";
import { GardenModel } from "../models/Garden";

export interface IncrementCounter {
  type: constants.INCREMENT_COUNTER;
}

export interface DecrementCounter {
  type: constants.DECREMENT_COUNTER;
}

export interface LoadTasks {
  type: constants.LOAD_TASKS;
}

export interface LocationSet {
  type: constants.LOCATION_SET;
}

export type CounterAction =
  | IncrementCounter
  | DecrementCounter
  | OtherActionResponse;

export function incrementCounter(): IncrementCounter {
  return {
    type: constants.INCREMENT_COUNTER
  };
}

export function decrementEnthusiasm(): DecrementCounter {
  return {
    type: constants.DECREMENT_COUNTER
  };
}

export function loadTasks(garden: GardenModel): LoadTasks {
  return {
    type: constants.LOAD_TASKS
  };
}

export default loadTasks
