import { SetOnboardingStepCompleted, StartSetup, AddBedType, RemoveBedType, SetBedSize, SetBedSun } from "../actions";
import { ONBOARDING_STEP_COMPLETED, SETUP_STARTED, ADD_BED_TYPE, REMOVE_BED_TYPE, SET_BED_SIZE, SET_BED_SUN } from "../constants";
import { LatLng } from "react-native-maps";
import  uuidv1  from "uuid/v1";
import { ImageSourcePropType } from "../../node_modules/@types/react-native";

export type BedProps = {
  type: string;
  image: ImageSourcePropType;
  selected : number
};

export type Bed = {
  type: string;
  id: string;
  sunHours?: number;
  size?: string;
};

export type GardenState = {
  setupStep: number,
  setup: {
    bedTypes: {[bedType: string]: BedProps} ,
    location?: LatLng,
    crops: string[],
    beds: {[bedId: string]: Bed},
  },
}

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
    } as {[bedType: string]: BedProps},
    crops: [],
    beds: {}
  }
};

export default (
  state: GardenState = defaultGardenState,
  action: SetOnboardingStepCompleted | StartSetup | AddBedType | RemoveBedType | SetBedSize | SetBedSun
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
    const id = uuidv1();
      return {
        ...state,
        setup: {
          ...state.setup,
          bedTypes: {
            ...state.setup.bedTypes,
            [action.attributes.bedType]: {
              ...state.setup.bedTypes[action.attributes.bedType],
              selected: state.setup.bedTypes[action.attributes.bedType].selected + 1,
            },
          },
          beds: {
            ...state.setup.beds,
            [id] : {
              type: [action.attributes.bedType],
              id: id
            }
          }
        }
      }

    case REMOVE_BED_TYPE:
      if(state.setup.bedTypes[action.attributes.bedType].selected <= 0){
        return state;
      }
      const bedsOfSameType = Object.entries(state.setup.beds).filter(([key, item]) => item.type === action.attributes.bedType);
      const lastBedOfType = Object.keys(bedsOfSameType)[bedsOfSameType.length -1];

      return {
        ...state,
        setup: {
          ...state.setup,
          bedTypes: {
            ...state.setup.bedTypes,
            [action.attributes.bedType]: {
              ...state.setup.bedTypes[action.attributes.bedType],
              selected: state.setup.bedTypes[action.attributes.bedType].selected -1,
            },
          },
          beds: {
            ...state.setup.beds,
            items: Object.keys(state.setup.beds).filter((key) => key !== lastBedOfType),
          }
        }
      }
    case SET_BED_SIZE:
      return {
        ...state,
        setup: {
          ...state.setup,
          beds: {
            ...state.setup.beds,
            [action.attributes.bedId]: {
              ...state.setup.beds[action.attributes.bedId],
              size: action.attributes.size,
            },
          },
        }
      }
    case SET_BED_SUN:
      return {
        ...state,
        setup: {
          ...state.setup,
          beds: {
            ...state.setup.beds,
            [action.attributes.bedId]: {
              ...state.setup.beds[action.attributes.bedId],
              sunHours: action.attributes.sunHours,
            },
          },
        }
      }
   
    default:
      return state;
  }
};
