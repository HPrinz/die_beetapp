import * as constants from "../constants";
import { GardenModel } from "../models/Garden";

export interface OtherActionResponse { 
  type: string;
  attributes : any 
}

export const OtherActionResponse: OtherActionResponse = { type: "", attributes: {} };

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
export interface SelectBed {
  type: constants.SELECT_BED;
  attributes: {
    bedId: string;
  };
}

export interface RemoveBedType {
  type: constants.REMOVE_BED_TYPE;
  attributes: {
    bedId: string;
  };
}

export interface SetBedSize {
  type: constants.SET_BED_SIZE;
  attributes: {
    bedId: string;
    size: number;
  };
}

export interface SetBedSun {
  type: constants.SET_BED_SUN;
  attributes: {
    bedId: string;
    sunHours: number;
  };
}
export interface SetBedName {
  type: constants.SET_BED_NAME;
  attributes: {
    bedId: string;
    name: string;
  };
}
export interface SetBedSetUp {
  type: constants.SET_BED_SET_UP;
  attributes: {
    bedId: string;
  };
}
export interface AddCrops {
  type: constants.ADD_CROPS;
  attributes: {
    cropsId: string;
  };
}

export interface StartSetup {
  type: constants.SETUP_STARTED;
}

export interface SetLocation {
  type: constants.SET_LOCATION;
  attributes: {
    lat: number;
    lng: number;
  }
}

export interface LoadTasks {
  type: constants.LOAD_TASKS;
  attributes: {}
}

export interface SelectTask {
  type: constants.SELECT_TASK;
  attributes: {
    taskId: string | undefined;
  }
}

export interface MarkTaskResolved {
  type: constants.MARK_TASK_RESOLVED;
  attributes: {
    taskId: string;
  }
}
export interface SetBedIdForTask {
  type: constants.SET_BED_ID_FOR_TASK;
  attributes: {
    taskId: string;
    bedId: string;
  }
}

// ---------------------------------

export function startSetup() : StartSetup {
  return {
    type: constants.SETUP_STARTED
  }
}

export function setOnboardingStepCompleted(step: number): SetOnboardingStepCompleted {
  return {
    type: constants.ONBOARDING_STEP_COMPLETED,
    attributes: {
      step
    }
  };
}

export function addBedType(bedType: string): AddBedType {
  return {
    type: constants.ADD_BED_TYPE,
    attributes: {
      bedType
    }
  };
}

export function selectBed(bedId: string): SelectBed {
  return {
    type: constants.SELECT_BED,
    attributes: {
      bedId
    }
  };
}

export function setBedSize(bedId: string, size: number): SetBedSize {
  return {
    type: constants.SET_BED_SIZE,
    attributes: {
      bedId,
      size
    }
  };
}

export function setBedSun(bedId: string, sunHours: number): SetBedSun {
  return {
    type: constants.SET_BED_SUN,
    attributes: {
      bedId,
      sunHours
    }
  };
}
export function setBedSetUp(bedId: string): SetBedSetUp {
  return {
    type: constants.SET_BED_SET_UP,
    attributes: {
      bedId,
    }
  };
}
export function setBedName(bedId: string, name : string): SetBedName {
  return {
    type: constants.SET_BED_NAME,
    attributes: {
      bedId,
      name
    }
  };
}

export function addCrops(cropsId: string): AddCrops {
  return {
    type: constants.ADD_CROPS,
    attributes: {
      cropsId,
    }
  };
}

export function removeBedType(bedId: string): RemoveBedType {
  return {
    type: constants.REMOVE_BED_TYPE,
    attributes: {
      bedId,
    }
  };
}

export function loadTasks(): LoadTasks {
  return {
    type: constants.LOAD_TASKS,
    attributes: {}
  };
}


export function selectTask(taskId: string | undefined): SelectTask {
  return {
    type: constants.SELECT_TASK,
    attributes: {
      taskId
    }
  };
}
export function setBedForTask(taskId: string, bedId : string): SetBedIdForTask {
  return {
    type: constants.SET_BED_ID_FOR_TASK,
    attributes: {
      taskId,
      bedId
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
export function setLocation(lat: number, lng: number): SetLocation {
  return {
    type: constants.SET_LOCATION,
    attributes: {
      lat,
      lng
    }
  };
}

export default loadTasks;
