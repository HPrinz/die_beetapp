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

export interface SetBedSize {
  type: constants.SET_BED_SIZE;
  attributes: {
    bedId: string;
    size: string;
  };
}

export interface SetBedSun {
  type: constants.SET_BED_SUN;
  attributes: {
    bedId: string;
    sunHours: number;
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

export interface SelectTask {
  type: constants.SELECT_TASK;
  attributes: {
    taskId: string;
  }
}

export interface MarkTaskResolved {
  type: constants.MARK_TASK_RESOLVED;
  attributes: {
    taskId: string;
  }
}

// ---------------------------------

export function startSetup() : StartSetup {
  return {
    type: constants.SETUP_STARTED
  }
}

export function SetOnboardingStepCompleted(step: number): SetOnboardingStepCompleted {
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

export function SetBedSize(bedId: string, size: string): SetBedSize {
  return {
    type: constants.SET_BED_SIZE,
    attributes: {
      bedId,
      size
    }
  };
}

export function SetBedSun(bedId: string, sunHours: number): SetBedSun {
  return {
    type: constants.SET_BED_SUN,
    attributes: {
      bedId,
      sunHours
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


export function selectTask(taskId: string): SelectTask {
  return {
    type: constants.SELECT_TASK,
    attributes: {
      taskId
    }
  };
}
export function markTaskResolved(taskId: string): MarkTaskResolved {
  return {
    type: constants.MARK_TASK_RESOLVED,
    attributes: {
      taskId
    }
  };
}

export default loadTasks;
