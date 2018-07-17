import { OtherActionResponse } from "../actions/action.type";
import { SELECT_TASK } from "../constants";

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
  Description: string;
  Bed: string;
  AvatarUrl: string;
  Done: boolean;
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
    Description: "",
    AvatarUrl: "../../../assets/img/giessen.png",
    Bed: "Beet",
    Done: false,
  } as Task,
  {
    id: '2',
    name: "Gießen",
    Description: "",
    AvatarUrl: "../../../assets/img/giessen.png",
    Bed: "Gewächshaus",
    Done: false,
  } as Task,
  {
    id: '3',
    name: "Tomaten ausgeizen",
    Description: "",
    AvatarUrl: "../../../assets/img/tomate.png",
    Bed: "Gewächshaus",
    Done: false,
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
