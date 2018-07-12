import { SetOnboardingStepCompleted, StartSetup } from "../actions";
import { ONBOARDING_STEP_COMPLETED, SETUP_STARTED } from "../constants";
import { LatLng } from "react-native-maps";

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

export const defaultGardenState: GardenState = {
  setupStep: 0,
  setup: {
    bedTypes: [
      {
        type: "Beet",
        image: require("../../assets/img/beet.jpg"),
        selected: 0
      },
      {
        type: "Frühbeet",
        image: require("../../assets/img/fruehbeet.png"),
        selected: 0
      },
      {
        type: "Hochbeet",
        image: require("../../assets/img/hochbeet.jpg"),
        selected: 0
      },
      {
        type: "Kübel/Kasten",
        image: require("../../assets/img/kuebel.png"),
        selected: 0
      },
      {
        type: "Gewächshaus",
        image: require("../../assets/img/gewaechshaus.jpg"),
        selected: 0
      },
      {
        type: "Gewächshaus (beheizt)",
        image: require("../../assets/img/gewaechshaus_beheizt.png"),
        selected: 0
      }
    ],
    crops: []
  }
};

export default (
  state: GardenState = defaultGardenState,
  action: SetOnboardingStepCompleted | StartSetup
) => {
  switch (action.type) {
    case SETUP_STARTED:
      console.log('YIEHA');
      return {
        ...defaultGardenState
      };
    case ONBOARDING_STEP_COMPLETED:
      return {
        ...state,
        setupStep: action.attributes.step
      };

    default:
      return state;
  }
};
