import { OtherActionResponse } from "../actions";
import { ONBOARDING_STEP_COMPLETED, ADD_BED_TYPE, REMOVE_BED_TYPE, SET_BED_SIZE, SET_BED_SUN, ADD_CROPS, SET_BED_SET_UP, SET_BED_NAME, SELECT_TASK, SET_BED_ID_FOR_TASK, LOAD_TASKS, SET_LOCATION, SELECT_BED, SET_WEATHER, MARK_TASK_RESOLVED } from "../constants";
import { LatLng } from "react-native-maps";
import uniqueId from 'lodash-es/uniqueId';
import uuidv1 from 'uuid/v1';
import { ImageSourcePropType } from "react-native";
import { taskTypes, TaskType, LITER_EVERY_M2_BY_DAY, ADDITIONAL_WATER_NEED_FOR_KUEBEL_KAESTEN_BY_DAY } from "../data/tasks";
import Weather, { getRain, getRainTotalAmount } from "./weather";
import moment, { Moment, isMoment } from 'moment' 
import 'moment/min/moment-with-locales';
import 'moment/locale/de';
import { bedTypes } from "../data/bedTypes";

export type BedProps = {
  name: string;
  image: ImageSourcePropType;
  id: string
};

export type Bed = {
  id: string;
  name: string;
  typeId: string;
  sunHours: number;
  size: number;
};

export type Crop = {
  id: string,
  name: string,
  image: string,
}

export interface Task {
  id: string;
  taskType: string;
  done: boolean | Moment;
  bedId?: string;
  cropId?: string;
  amount?: number;
  category: string;
}


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

    case MARK_TASK_RESOLVED:
      return {
        ...state,
        tasks: state.tasks.map((task: Task) => {
          if (task.id === action.attributes.taskId) {
            return {
              ...task,
              done: moment(),
            }
          }
          return task;
        })
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
      let tasks: Task[] = [ ...state.tasks ]

      state.setup.beds.forEach((element, index) => {
        const waterNeeds = shoudldWater(tasks, element.id, element.typeId, taskTypes['giessen'], state.weather)
        console.log('ASA' + waterNeeds*element.size);
        if(waterNeeds > 0){
          tasks.push({
            bedId: element.id,
            done: false,
            id: uuidv1(),
            taskType: taskTypes['giessen'].id,
            amount: waterNeeds * element.size,
            category: taskTypes['giessen'].type,
          } as Task)
        }
      });

      Object.entries(state.setup.crops).filter(([element, value]) => value).forEach(([element, index]) => {
        if (element === 'tomato') {
          if(shoudldAddTask(tasks, element, taskTypes['tomaten_ausgeizen'])){
            tasks.push({
              cropId: element,
              done: false,
              id: uuidv1(),
              taskType: taskTypes['tomaten_ausgeizen'].id,
              category: taskTypes['tomaten_ausgeizen'].type,
            } as Task);
          }
          if(shoudldAddTask(tasks, element, taskTypes['laub_entfernen'])){
            tasks.push({
              cropId: element,
              done: false,
              id: uuidv1(),
              taskType: taskTypes['laub_entfernen'].id,
              category: taskTypes['laub_entfernen'].type,
            } as Task);
          }
          if(shoudldAddTask(tasks, element, taskTypes['triebe_reduzieren'])){
            tasks.push({
              cropId: element,
              done: false,
              id: uuidv1(),
              taskType: taskTypes['triebe_reduzieren'].id,
              category: taskTypes['triebe_reduzieren'].type,
            } as Task)
          }
        }
        if (element === 'lettuce') {
          if(shoudldAddTask(tasks, element, taskTypes['schnecken_sammeln'])){
            tasks.push({
              cropId: 'lettuce',
              done: false,
              id: uuidv1(),
              taskType: taskTypes['schnecken_sammeln'].id,
              category: taskTypes['schnecken_sammeln'].type,
            } as Task)
          }
        }
      });

      if(shoudldAddTask(tasks, 'NONE', taskTypes['tools'])){
        tasks.push({
          done: false,
          id: uuidv1(),
          taskType: taskTypes['tools'].id,
          category: taskTypes['tools'].type,
        } as Task);
      }

      if(shoudldAddTask(tasks, 'NONE', taskTypes['regenwasser'])){
        tasks.push({
          done: false,
          id: uuidv1(),
          taskType: taskTypes['regenwasser'].id,
          category: taskTypes['regenwasser'].type,
        } as Task);
      }

      if(shoudldAddTask(tasks, 'NONE', taskTypes['bienenhotel'])){
        tasks.push({
          done: false,
          id: uuidv1(),
          taskType: taskTypes['bienenhotel'].id,
          category: taskTypes['bienenhotel'].type,
        } as Task);
      }

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

function shoudldAddTask(tasks: Task[], element: string, tasktype : TaskType) {
  const task = tasks.find(x => {
    const isSameTaskType = x.taskType === tasktype.id;
    if(!x.bedId && !x.cropId){
      return isSameTaskType;
    }
    const bedCondition = x.bedId === element
    const cropCondition = x.cropId === element;
    return isSameTaskType && (bedCondition || cropCondition);
  });

  if(!task) return true;
  if(!task.done) return false;
  if(tasktype.frequencyInDays === 0) return false;
  if(moment().diff(task.done as Moment, 'days') >= tasktype.frequencyInDays){
      return true;
  }
  return false;
}
function shoudldWater(tasks: Task[], element: string, bedType : string, tasktype : TaskType, weather : Weather | undefined) {
  if (shoudldAddTask(tasks, element, tasktype)){
    let waterNeeds = LITER_EVERY_M2_BY_DAY * tasktype.frequencyInDays;
    console.log("START = " + waterNeeds);
    console.log("bedType = " + bedType);
    if(!weather) return waterNeeds;
    if(bedType === bedTypes['gewaechshaus'].id){ // || bedType === bedTypes['gewaechshaus_beheizt'].id
      console.log("GWH = " + waterNeeds);
      return waterNeeds;
    }
    if(bedType === bedTypes['kuebel_kasten'].id){
      waterNeeds = waterNeeds + (ADDITIONAL_WATER_NEED_FOR_KUEBEL_KAESTEN_BY_DAY * tasktype.frequencyInDays);
      console.log("KK = " + waterNeeds);
    }
    const waterNeedsLeft = waterNeeds - getRainTotalAmount((weather as Weather), tasktype.frequencyInDays);
    console.log('RD = ' + waterNeedsLeft);
    return waterNeedsLeft;
  }
  console.log('3');
  return 0;
}
