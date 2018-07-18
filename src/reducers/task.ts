import { OtherActionResponse } from "../actions/action.type";
import { SELECT_TASK, SETUP_STARTED } from "../constants";

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
  image: string;
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
    image: "../../../assets/img/giessen.png",
    bed: "Beet",
    done: false,
  } as Task,
  {
    id: '2',
    name: "Gießen",
    description: "",
    image: "../../../assets/img/giessen.png",
    bed: "Gewächshaus",
    done: false,
  } as Task,
  {
    id: '3',
    name: "Tomaten ausgeizen",
    description: "",
    image: "../../../assets/img/tomate.png",
    bed: "Gewächshaus",
    done: false,
  } as Task]
}

export default (
  state: TaskState = defaultState,
  action: OtherActionResponse
) => {
  switch (action.type) {
    case SELECT_TASK:
      return {
        ...state,
        selectedTaskId: action.attributes.taskId
      };

    default:
      return state;
  }
};
