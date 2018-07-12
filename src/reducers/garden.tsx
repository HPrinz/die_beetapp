import { SetOnboardingStepCompleted } from "../actions";
import { ONBOARDING_STEP_COMPLETED } from "../constants";
import { LatLng } from "react-native-maps";
import { OtherActionResponse } from "../actions/action.type";

export type BedProps = {
  type: string;
  image: string;
  selected: number;
  sunHours?: number;
  size?: number;
};

export type GardenState = {
  setupStep: number;
  setup: {
    bedTypes: BedProps[];
    location?: LatLng;
    crops: string[];
  };
};

const defaultState: GardenState = {
  setupStep: 0,
  setup: {
    bedTypes: [
      {
        type: "Beet",
        image: "../../../assets/img/beet.jpg",
        selected: 0
      },
      {
        type: "Frühbeet",
        image: "../../../assets/img/fruehbeet.png",
        selected: 0
      },
      {
        type: "Kübel/Kasten",
        image: "../../../assets/img/kuebel.png",
        selected: 0
      },
      {
        type: "Gewächshaus",
        image: "../../../assets/img/gewaechshaus.jpg",
        selected: 0
      },
      {
        type: "Gewächshaus (beheizt)",
        image: "../../../assets/img/gewaechshaus_beheizt.png",
        selected: 0
      }
    ],
    crops: []
  }
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
      };

    default:
      return state;
  }
};
