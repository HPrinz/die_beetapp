import { SetOnboardingStepCompleted, StartSetup, AddBedType, RemoveBedType, SetBedSize, SetBedSun, AddCrops, SetBedSetUp } from "../actions";
import { ONBOARDING_STEP_COMPLETED, SETUP_STARTED, ADD_BED_TYPE, REMOVE_BED_TYPE, SET_BED_SIZE, SET_BED_SUN, ADD_CROPS, SET_BED_SET_UP } from "../constants";
import { LatLng } from "react-native-maps";
import uniqueId from 'lodash-es/uniqueId';
import { ImageSourcePropType } from "react-native";

export type BedProps = {
  type: string;
  image: ImageSourcePropType;
  selected : number
};

export type Bed = {
  type: string;
  id: string;
  sunHours?: number;
  size?: number;
};

export type GardenState = {
  setupStep: number,
  setup: {
    bedTypes: {[bedType: string]: BedProps} ,
    location?: LatLng,
    crops: Crop[],
    beds: Bed[],
  },
  selectedBedId : string | undefined,
}

export type Crop = {
  id: string,
  name: string,
  image: string,
  selected: boolean,
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
    crops: [ {
      id: 'tomato',
      name: 'Tomate',
      image: require("../../assets/img/tomate.png"),
      selected: false
    },
    {
      id: 'lettuce',
      name: 'Salat',
      image: require("../../assets/img/salat.png"),
      selected: false
    }],
    beds: [],
  },
  selectedBedId : undefined
};

export default (
  state: GardenState = defaultGardenState,
  action: SetOnboardingStepCompleted | StartSetup | AddBedType | RemoveBedType | SetBedSize | SetBedSun | AddCrops | SetBedSetUp
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
    const id = uniqueId(action.attributes.bedType);
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
          beds: [...state.setup.beds,
            {
              type: action.attributes.bedType,
              id: id
            }
          ]
        },
        selectedBedId: id
      };

    case REMOVE_BED_TYPE:
      const bed = state.setup.beds.find(x => x.id === action.attributes.bedId)
      if(!bed){
        return state;
      }

      return {
        ...state,
        setup: {
          ...state.setup,
          bedTypes: {
            ...state.setup.bedTypes,
            [bed.type]: {
              ...state.setup.bedTypes[bed.type],
              selected: state.setup.bedTypes[bed.type].selected -1,
            },
          },
          beds: 
            state.setup.beds.filter((item : Bed) => {
              if(item.id !== action.attributes.bedId) {
                  return item;
              }
          })
        }
      };

    case SET_BED_SIZE:
      return {
        ...state,
        setup: {
          ...state.setup,
          beds: 
            state.setup.beds.map((item : Bed) => {
              if(item.id === action.attributes.bedId) {
                  return {
                    ...item, 
                    size: action.attributes.size as number,
                  }
              }
              return item;        
          })
        }
    };

    case SET_BED_SUN:
      return {
        ...state,
        setup: {
          ...state.setup,
          beds: 
            state.setup.beds.map((item : Bed) => {
              if(item.id === action.attributes.bedId) {
                  return {
                    ...item, 
                    sunHours: action.attributes.sunHours
                  }
              }
              return item;     
          })
        }
      };

    case SET_BED_SET_UP:
      return {
        ...state,
        selectedBedId: undefined,
      };

    case ADD_CROPS:
      return {
        ...state,
        setup: {
          ...state.setup,
          crops: 
            state.setup.crops.map(item => {
              if(item.id !== action.attributes.cropsId) {
                  return item;
              }
              return {
                  ...item,
                  selected: !item.selected
              };    
            })
          }
        };
   
    default:
      return state;
  }
};
