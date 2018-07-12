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

export interface StartSetup {
  type: constants.SETUP_STARTED;
}

export interface LocationSet {
  type: constants.LOCATION_SET;
}

export interface LoadTasks {
  type: constants.LOAD_TASKS;
}

// ---------------------------------

export function startSetup() : StartSetup {
  console.log('&/%/(RFIS');
  return {
    type: constants.SETUP_STARTED
  }
}

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
  console.log('JKHG' + JSON.stringify(bedTypes));
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
