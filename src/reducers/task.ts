import { OtherActionResponse } from "../actions/action.type";
import { SELECT_TASK } from "../constants";
import { Task } from "../components/tasks/TaskList";

export type TaskState = {
  selectedTaskId: string | undefined;
  tasks: Task[]
};

export const defaultState: TaskState = {
  selectedTaskId: undefined,
  tasks: [{
    name: "Gießen",
    Description: "",
    AvatarUrl: "../../../assets/img/giessen.png",
    Bed: "Beet",
    Done: false,
  } as Task,
  {
    name: "Gießen",
    Description: "",
    AvatarUrl: "../../../assets/img/giessen.png",
    Bed: "Gewächshaus",
    Done: false,
  } as Task,
  {
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
        selectedTask: action.attributes.taskId
      };

    default:
      return state;
  }
};
