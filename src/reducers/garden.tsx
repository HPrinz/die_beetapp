import { CounterAction, SetOnboardingStepCompleted } from "../actions";
import { StoreState } from "../types";
import { INCREMENT_COUNTER, DECREMENT_COUNTER, LOAD_TASKS, ONBOARDING_STEP_COMPLETED } from "../constants";
import { OtherActionResponse } from "../actions/action.type";

export type GardenState = {
  setupStep: number;
};

const defaultState: GardenState = {
  setupStep: 0
};

export default (
  state: GardenState = defaultState,
  action: SetOnboardingStepCompleted | OtherActionResponse
) => {
  switch (action.type) {
    case ONBOARDING_STEP_COMPLETED:
    return {
      ...state,
      setupStep: action.attributes.step
    }

    default:
      return state;
  }
};
