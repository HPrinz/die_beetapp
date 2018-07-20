import { OtherActionResponse } from "../actions";
import { ONBOARDING_STEP_COMPLETED, ADD_BED_TYPE, REMOVE_BED_TYPE, SET_BED_SIZE, SET_BED_SUN, ADD_CROPS, SET_BED_SET_UP, SET_BED_NAME, SELECT_TASK, SET_BED_ID_FOR_TASK, LOAD_TASKS, SET_LOCATION, SELECT_BED, SET_WEATHER } from "../constants";
import { LatLng } from "react-native-maps";
import uniqueId from 'lodash-es/uniqueId';
import uuidv1 from 'uuid/v1';
import { ImageSourcePropType } from "react-native";
import { taskTypes } from "../data/tasks";
import Weather from "./weather";

export type BedProps = {
  name: string;
  image: ImageSourcePropType;
  id: string
};

export type Bed = {
  id: string;
  name: string;
  typeId: string;
  sunHours?: number;
  size?: number;
};

export type Crop = {
  id: string,
  name: string,
  image: string,
}

export interface Task {
  id: string;
  taskType: string;
  done: boolean;
  bedId?: string;
  cropId?: string;
}

export const bedTypes: { [bedTypeId: string]: BedProps } = {
  'beet': {
    id: 'beet',
    name: "Beet",
    image: require("../../assets/img/beete/beet.png"),
  },
  'fruehbeet': {
    id: 'fruehbeet',
    name: "Frühbeet",
    image: require("../../assets/img/beete/fruehbeet.png"),
  },
  'hochbeet': {
    id: 'hochbeet',
    name: "Hochbeet",
    image: require("../../assets/img/beete/hochbeet.png"),
  },
  'kuebel_kasten': {
    id: 'kuebel_kasten',
    name: "Kübel/Kasten",
    image: require("../../assets/img/beete/kuebel.png"),
  },
  'gewaechshaus': {
    id: 'gewaechshaus',
    name: "Gewächshaus",
    image: require("../../assets/img/beete/gewaechshaus.png"),
  },
  'gewaechshaus_beheizt': {
    id: 'gewaechshaus_beheizt',
    name: "Gewächshaus (beheizt)",
    image: require("../../assets/img/beete/gewaechshaus_beheizt.png"),
  }
};

export const cropTypes: Crop[] = [{
  id: 'tomato',
  name: 'Tomate',
  image: require("../../assets/img/gemuese/tomate.png"),
},
{
  id: 'lettuce',
  name: 'Salat',
  image: require("../../assets/img/gemuese/salat.png"),
}];

export type GardenState = {
  setupStep: number,
  setup: {
    beds: Bed[],
    location?: LatLng,
    crops: { [cropsId: string]: boolean },
  },
  selectedBedId: string | undefined,
  selectedTaskId: string | undefined;
  tasks: Task[];
  weather?: Weather;
}

export const defaultGardenState: GardenState = {
  setupStep: 0,
  setup: {
    crops: {},
    beds: [],
  },
  selectedTaskId: undefined,
  tasks: [],
  selectedBedId: undefined
};

export default (
  state: GardenState = defaultGardenState,
  action: OtherActionResponse
) => {
  switch (action.type) {

    case ONBOARDING_STEP_COMPLETED:
      return {
        ...state,
        setupStep: action.attributes.step
      };

    case ADD_BED_TYPE:
      const name = uniqueId(bedTypes[action.attributes.bedType].name + " #");
      const id = uuidv1();
      return {
        ...state,
        setup: {
          ...state.setup,
          beds: [...state.setup.beds,
          {
            id,
            name,
            typeId: action.attributes.bedType,
          }
          ]
        },
        selectedBedId: id
      };

    case SELECT_BED:
      return {
        ...state,
        selectedBedId: action.attributes.bedId
      };

    case REMOVE_BED_TYPE:
      const bed = state.setup.beds.find(x => x.id === action.attributes.bedId)
      if (!bed) {
        return state;
      }

      return {
        ...state,
        setup: {
          ...state.setup,
          beds:
            state.setup.beds.filter((item: Bed) => {
              if (item.id !== action.attributes.bedId) {
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
            state.setup.beds.map((item: Bed) => {
              if (item.id === action.attributes.bedId) {
                return {
                  ...item,
                  size: action.attributes.size as number,
                }
              }
              return item;
            })
        }
      };
    case SET_BED_NAME:
      return {
        ...state,
        setup: {
          ...state.setup,
          beds:
            state.setup.beds.map((item: Bed) => {
              if (item.id === action.attributes.bedId) {
                return {
                  ...item,
                  name: action.attributes.name,
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
            state.setup.beds.map((item: Bed) => {
              if (item.id === action.attributes.bedId) {
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
          crops: {
            ...state.setup.crops,
            [action.attributes.cropsId]: !state.setup.crops[action.attributes.cropsId]
          }
        }
      };

    case SELECT_TASK:
      return {
        ...state,
        selectedTaskId: action.attributes.taskId
      };

    case SET_BED_ID_FOR_TASK:
      return {
        ...state,
        tasks: state.tasks.map((item: Task) => {
          if (item.id === action.attributes.taskId) {
            return {
              ...item,
              bed: action.attributes.bedId
            };
          }
          return item;
        })
      };

    case SET_LOCATION:
      return {
        ...state,
        setup: {
          ...state.setup,
          location: {
            latitude: action.attributes.lat,
            longitude: action.attributes.lng,
          } as LatLng
        }
      };

    case LOAD_TASKS:
      let tasks: Task[] = []
      state.setup.beds.filter(element => element.typeId !== 'gewaechshaus').forEach((element, index) => {
        tasks.push({
          bedId: element.id,
          done: false,
          id: uuidv1(),
          taskType: 'giessen'
        } as Task)
      });

      Object.entries(state.setup.crops).filter(([element, value]) => value).forEach(([element, index]) => {
        if (element === 'tomato') {
          tasks.push({
            cropId: element,
            done: false,
            id: uuidv1(),
            taskType: taskTypes['tomaten_ausgeizen'].id
          } as Task);
          tasks.push({
            cropId: element,
            done: false,
            id: uuidv1(),
            taskType: taskTypes['laub_entfernen'].id
          } as Task);
          tasks.push({
            cropId: element,
            done: false,
            id: uuidv1(),
            taskType: taskTypes['triebe_reduzieren'].id
          } as Task)
        }
      });

      tasks.push({
        done: false,
        id: uuidv1(),
        taskType: taskTypes['tools'].id
      } as Task);

      tasks.push({
        done: false,
        id: uuidv1(),
        taskType: 'bienenhotel'
      } as Task);

      return {
        ...state,
        tasks
      };

    case SET_WEATHER:
      return {
        ...state,
        weather: action.attributes.weather
      };

    default:
      return state;
  }
};
