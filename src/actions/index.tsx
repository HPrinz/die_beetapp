import * as constants from "../constants";
import { OtherActionResponse } from "./action.type";
import { GardenModel } from "../models/Garden";
import { BedProps } from "../reducers/garden";

export interface SetOnboardingStepCompleted {
  type: constants.ONBOARDING_STEP_COMPLETED;
  attributes: {
    step: number;
  };
}

export interface SetBedTypes {
  type: constants.SET_BED_TYPES;
  attributes: {
    bedTypes: BedProps[];
  };
}

export interface LoadTasks {
  type: constants.LOAD_TASKS;
}

export interface LocationSet {
  type: constants.LOCATION_SET;
}

export type CounterAction = SetOnboardingStepCompleted | OtherActionResponse;

export function SetOnboardingStepCompleted(
  step: number
): SetOnboardingStepCompleted {
  return {
    type: constants.ONBOARDING_STEP_COMPLETED,
    attributes: {
      step
    }
  };
}

export function SetBedTypes(bedTypes: BedProps[]): SetBedTypes {
  return {
    type: constants.SET_BED_TYPES,
    attributes: {
      bedTypes
    }
  };
}

export function loadTasks(garden: GardenModel): LoadTasks {
  return {
    type: constants.LOAD_TASKS
  };
}

export default loadTasks;
