import { SetOnboardingStepCompleted, StartSetup, AddBedType, RemoveBedType } from "../actions";
import { ONBOARDING_STEP_COMPLETED, SETUP_STARTED, ADD_BED_TYPE, REMOVE_BED_TYPE } from "../constants";
import { LatLng } from "react-native-maps";
import { ImageSourcePropType } from "../../node_modules/@types/react-native";

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
    bedTypes: {[bedType: string]: BedProps} ;
    location?: LatLng;
    crops: string[];
  };
};

export const defaultGardenState: GardenState = {
  setupStep: 0,
  setup: {
    bedTypes: {
      "Beet" : {
        type: "Beet",
        image: require("../../assets/img/beet.jpg"),
        selected: 0
      },
      "Frühbeet" : {
        type: "Frühbeet",
        image: require("../../assets/img/fruehbeet.png"),
        selected: 0
      },
      "Hochbeet" : {
        type: "Hochbeet",
        image: require("../../assets/img/hochbeet.jpg"),
        selected: 0
      },
      "Kübel/Kasten" : {
        type: "Kübel/Kasten",
        image: require("../../assets/img/kuebel.png"),
        selected: 0
      },
      "Gewächshaus" : {
        type: "Gewächshaus",
        image: require("../../assets/img/gewaechshaus.jpg"),
        selected: 0
      },
      "Gewächshaus (beheizt)" : {
        type: "Gewächshaus (beheizt)",
        image: require("../../assets/img/gewaechshaus_beheizt.png"),
        selected: 0
      }
    },
    crops: []
  }
};

export default (
  state: GardenState = defaultGardenState,
  action: SetOnboardingStepCompleted | StartSetup | AddBedType | RemoveBedType
) => {
  switch (action.type) {
    case SETUP_STARTED:
      return {
        ...defaultGardenState
      };

    case ONBOARDING_STEP_COMPLETED:
      return {
        ...state,
        setupStep: action.attributes.step
      };

    case ADD_BED_TYPE:
      return {
        ...state,
        setup: {
          ...state.setup,
          bedTypes: {
            ...state.setup.bedTypes,
            [action.attributes.bedType] : {
              ...state.setup.bedTypes[action.attributes.bedType], 
              selected: state.setup.bedTypes[action.attributes.bedType].selected + 1,
            }
          }
        }
      }

    case REMOVE_BED_TYPE:
      if(state.setup.bedTypes[action.attributes.bedType].selected <= 0){
        return state;
      }
      return {
        ...state,
        setup: {
          ...state.setup,
          bedTypes: {
            ...state.setup.bedTypes,
            [action.attributes.bedType] : {
              ...state.setup.bedTypes[action.attributes.bedType], 
              selected: state.setup.bedTypes[action.attributes.bedType].selected - 1,
            }
          }
        }
      }

    default:
      return state;
  }
};
