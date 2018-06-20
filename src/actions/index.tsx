import * as constants from "../constants";
import { OtherActionResponse } from "./action.type";
import { GardenModel } from "../models/Garden";

export interface IncrementCounter {
  type: constants.INCREMENT_COUNTER;
}

export interface SetOnboardingStepCompleted {
  type: constants.ONBOARDING_STEP_COMPLETED,
  attributes: {
    step : number
  }
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
  | SetOnboardingStepCompleted
  | OtherActionResponse;

export function SetOnboardingStepCompleted(step: number): SetOnboardingStepCompleted {
  return {
    type: constants.ONBOARDING_STEP_COMPLETED,
    attributes: {
      step
    }
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
