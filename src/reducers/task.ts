
import { SELECT_TASK, SETUP_STARTED, SET_BED_ID_FOR_TASK } from "../constants";
import { SetBedIdForTask, SelectTask } from "../actions";
import { ImageSourcePropType } from "../../node_modules/@types/react-native";

export const tasktypes = [
  {
      label: 'Gießen',
      value: 'giessen',
  },
  {
      label: 'Pflanzen',
      value: 'planzen',
  },
  {
      label: 'Ernten',
      value: 'ernten',
  },
  {
      label: 'Ausgeizen',
      value: 'ausgeizen',
  }
]

export interface Task {
  id: string;
  name: string;
  description: string;
  bed: string;
  image: any;
  done: boolean;
  type: string
}

export type TaskState = {
  selectedTaskId: string | undefined;
  tasks: Task[]
};

export const defaultState: TaskState = {
  selectedTaskId: undefined,
  tasks: [{
    id: '1',
    name: "Gießen",
    description: "",
    image: require("../../assets/img/giessen.png"),
    bed: "",
    done: false,
  } as Task,
  {
    id: '2',
    name: "Gießen",
    description: "",
    image: require("../../assets/img/giessen.png"),
    bed: "",
    done: false,
  } as Task,
  {
    id: '3',
    name: "Tomaten ausgeizen",
    description: "",
    image: require("../../assets/img/tomate.png"),
    bed: "",
    done: false,
  } as Task]
}

export default (
  state: TaskState = defaultState,
  action: SetBedIdForTask | SelectTask
) => {
  switch (action.type) {
    
    case SELECT_TASK:
      return {
        ...state,
        selectedTaskId: action.attributes.taskId
      }
    
    case SET_BED_ID_FOR_TASK:
      return {
        ...state,
        tasks: state.tasks.map((item : Task) => {
          if(item.id === action.attributes.taskId) {
              return {
                ...item, 
                bed: action.attributes.bedId,
              }
          }
          return item;        
        })
      }

    default:
      return state;
  }
};
