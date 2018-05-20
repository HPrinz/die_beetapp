import { CounterAction } from "../actions";
import { StoreState } from "../types";
import { INCREMENT_COUNTER, DECREMENT_COUNTER, LOAD_TASKS } from "../constants";
import { OtherActionResponse } from "../actions/action.type";

export type GardenState = {
  counterLevel: number;
  setupStep: number;
};

const defaultState: GardenState = {
  counterLevel: 0,
  setupStep: 0
};

export default (
  state: GardenState = defaultState,
  action: CounterAction = OtherActionResponse
) => {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return {
        ...state,
        counterLevel: state.counterLevel + 1
      };
    case DECREMENT_COUNTER:
      return {
        ...state,
        counterLevel: Math.max(1, state.counterLevel - 1)
      };
    default:
      return state;
  }
};
