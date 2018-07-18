import { SELECT_TASK, SETUP_STARTED, SET_BED_ID_FOR_TASK, LOAD_TASKS } from "../constants";
import { SetBedIdForTask, SelectTask, LoadTasks } from "../actions";
import { ImageSourcePropType } from "../../node_modules/@types/react-native";

export const tasktypes = [
  {
    label: "Gießen",
    value: "giessen"
  },
  {
    label: "Pflanzen",
    value: "planzen"
  },
  {
    label: "Ernten",
    value: "ernten"
  },
  {
    label: "Ausgeizen",
    value: "ausgeizen"
  }
];

export interface Task {
  id: string;
  name: string;
  description: string;
  bed: string;
  image: any;
  done: boolean;
  type: string;
}

export type TaskState = {
  selectedTaskId: string | undefined;
  tasks: Task[];
};

export const defaultState: TaskState = {
  selectedTaskId: undefined,
  tasks: [
    {
      id: "1",
      name: "Gießen",
      description: "",
      image: require("../../assets/img/giessen.png"),
      bed: "",
      done: false
    } as Task,
    {
      id: "2",
      name: "Gießen",
      description: "Zum Wässern von Gehölzen, Stauden, Hecken und Gemüsepflanzen sollte man besser nicht den Rasensprenger verwenden. Der ist nur ideal für größere freie Flächen. Ansonsten landet mit Sprinkleranlagen zu viel Wasser auf den Blättern. Dort verdunstet es ungenutzt oder begünstigt sogar Pilzkrankheiten, wenn es nicht schnell trocknet.\nMit Gießkanne und Gartenschlauch kommt man besser unter die Zweige und Blätter der Pflanzen. Wer eine automatische Bewässerungslösung bevorzugt, sollte ein Tropfrohrsystem verlegen. \n Als Faustregel für die Gießmenge gilt: Je größer die Blätter, desto höher der Wasserbedarf. Mediterrane Pflanzen sind es hingegen gewöhnt, mit wenig Feuchtigkeit auszukommen. Sie überstehen auch einige trockene Tage. Südländische Kräuter, wie Thymian und Rosmarin sollten ebenfalls nicht zu oft gegossen werden. Am besten wartet man, bis die Erde ausgetrocknet ist und gießt dann reichlich. \n Besser einmal richtig gießen heißt auch die Devise im Gemüsebeet: Die Experten der Bayerischen Gartenakademie raten, besser 14 Liter pro Woche an einem einzigen Tag ins Beet zu gießen. Und zwar verteilt auf mehrere Stunden, so dass das Wasser jeweils Zeit bekommt, einzusickern.",
      image: require("../../assets/img/giessen.png"),
      bed: "",
      done: false
    } as Task,
    {
      id: "3",
      name: "Tomaten ausgeizen",
      description:
        "Zum Ausgeizen brauchen Sie normalerweise kein Werkzeug. Untersuchen Sie die Tomatenpflanze auf neue Triebe in den Achseln und prüfen Sie, welche von ihnen wachsen sollen und welche nicht. Tipp: Lassen Sie nur sehr wenige Triebe stehen, denn die klassische Stabtomate ist äußerst wüchsig und wird leicht zum Gestrüpp. Knipsen Sie dann einfach die noch sehr jungen, kleinen Achseltriebe mit den Fingernägeln von der Pflanze ab und genießen Sie den fantastischen Tomatengeruch an den Fingerspitzen. Etwas größere Triebe werden von einer zur anderen Seite geknickt bis sie von selbst abbrechen. Achtung: Die jungen Triebe dürfen nicht nach oben oder fransig abgerissen werden, denn das verursacht große Verletzungen an der Pflanze.\nHaben Sie beim Ausgeizen der Tomaten einen Trieb übersehen und er ist schon recht dick geworden, verwenden Sie zum Entfernen lieber ein scharfes Messer. Schneiden Sie den Zweig vorsichtig dicht am Haupttrieb ab, ohne diesen zu verletzen. Es ist natürlich zu beachten, dass beim Ausgeizvorgang viele kleine Risse und Wunden am Stängel der Tomate entstehen, welche Eintrittspforten für Krankheitserreger sind. Achten Sie deshalb darauf die Rissfläche so klein wie möglich zu halten. Optimalerweise waschen Sie sich die Hände oder reinigen kurz das Werkzeug, bevor Sie von einer zur nächsten Pflanze übergehen.",
      image: require("../../assets/img/tomate.png"),
      bed: "",
      done: false
    } as Task
  ]
};

export default (
  state: TaskState = defaultState,
  action: SetBedIdForTask | SelectTask | LoadTasks
) => {
  switch (action.type) {
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
    case LOAD_TASKS:
      return {
        ...state,
        tasks: defaultState.tasks
        
      };

    default:
      return state;
  }
};
