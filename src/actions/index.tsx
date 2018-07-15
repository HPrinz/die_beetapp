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

export interface AddBedType {
  type: constants.ADD_BED_TYPE;
  attributes: {
    bedType: string;
  };
}
export interface RemoveBedType {
  type: constants.REMOVE_BED_TYPE;
  attributes: {
    bedType: string;
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

export function AddBedType(bedType: string): AddBedType {
  return {
    type: constants.ADD_BED_TYPE,
    attributes: {
      bedType
    }
  };
}

export function RemoveBedType(bedType: string): RemoveBedType {
  return {
    type: constants.REMOVE_BED_TYPE,
    attributes: {
      bedType
    }
  };
}

export function loadTasks(garden: GardenModel): LoadTasks {
  return {
    type: constants.LOAD_TASKS
  };
}

export default loadTasks;
