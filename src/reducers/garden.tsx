import { SetOnboardingStepCompleted, StartSetup, AddBedType, RemoveBedType, SetBedSize, SetBedSun, AddCrops, SetBedSetUp, SetBedName, SelectTask, LoadTasks, OtherActionResponse } from "../actions";
import { ONBOARDING_STEP_COMPLETED, SETUP_STARTED, ADD_BED_TYPE, REMOVE_BED_TYPE, SET_BED_SIZE, SET_BED_SUN, ADD_CROPS, SET_BED_SET_UP, SET_BED_NAME, SELECT_TASK, SET_BED_ID_FOR_TASK, LOAD_TASKS, SET_LOCATION, SELECT_BED } from "../constants";
import { LatLng } from "react-native-maps";
import uniqueId from 'lodash-es/uniqueId';
import uuidv1 from 'uuid/v1';
import { ImageSourcePropType } from "react-native";

export type BedProps = {
  name: string;
  image: ImageSourcePropType;
  id : string
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

export type TaskType = {
  id: string,
  name: string,
  image: any,
  icon: any,
  description: string,
  metadata: {},
}

export interface Task {
  id: string;
  taskType: string;
  done: boolean;
  bedId: string;
}

export const bedTypes : {[bedTypeId: string] : BedProps}= {
  'beet': {
    id: 'beet',
    name: "Beet",
    image: require("../../assets/img/beet.png"),
  },
  'fruehbeet' : {
    id: 'fruehbeet',
    name: "Frühbeet",
    image: require("../../assets/img/fruehbeet.png"),
  },
  'hochbeet' : {
    id: 'hochbeet',
    name: "Hochbeet",
    image: require("../../assets/img/hochbeet.png"),
  },
  'kuebel_kasten': {
    id: 'kuebel_kasten',
    name: "Kübel/Kasten",
    image: require("../../assets/img/kuebel.png"),
  },
  'gewaechshaus' : {
    id: 'gewaechshaus',
    name: "Gewächshaus",
    image: require("../../assets/img/gewaechshaus.png"),
  },
  'gewaechshaus_beheizt' : {
    id: 'gewaechshaus_beheizt',
    name: "Gewächshaus (beheizt)",
    image: require("../../assets/img/gewaechshaus_beheizt.png"),
  }
};

export const cropTypes: Crop[] = [ {
  id: 'tomato',
  name: 'Tomate',
  image: require("../../assets/img/tomate.png"),
},
{
  id: 'lettuce',
  name: 'Salat',
  image: require("../../assets/img/salat.png"),
}];

export const taskTypes: {[id: string]: TaskType} = {
  'saen': { 
    id: "saen",
    name: "Säen",
    description: "",
    icon: require("../../assets/img/saen.png"),
    image: require("../../assets/img/saen.png"),
    metadata: {}
  },
  'giessen': {
    id: "giessen",
    name: "Gießen",
    description: "Zum Wässern von Gehölzen, Stauden, Hecken und Gemüsepflanzen sollte man besser nicht den Rasensprenger verwenden. Der ist nur ideal für größere freie Flächen. Ansonsten landet mit Sprinkleranlagen zu viel Wasser auf den Blättern. Dort verdunstet es ungenutzt oder begünstigt sogar Pilzkrankheiten, wenn es nicht schnell trocknet.\nMit Gießkanne und Gartenschlauch kommt man besser unter die Zweige und Blätter der Pflanzen. Wer eine automatische Bewässerungslösung bevorzugt, sollte ein Tropfrohrsystem verlegen. \n Als Faustregel für die Gießmenge gilt: Je größer die Blätter, desto höher der Wasserbedarf. Mediterrane Pflanzen sind es hingegen gewöhnt, mit wenig Feuchtigkeit auszukommen. Sie überstehen auch einige trockene Tage. Südländische Kräuter, wie Thymian und Rosmarin sollten ebenfalls nicht zu oft gegossen werden. Am besten wartet man, bis die Erde ausgetrocknet ist und gießt dann reichlich. \n Besser einmal richtig gießen heißt auch die Devise im Gemüsebeet: Die Experten der Bayerischen Gartenakademie raten, besser 14 Liter pro Woche an einem einzigen Tag ins Beet zu gießen. Und zwar verteilt auf mehrere Stunden, so dass das Wasser jeweils Zeit bekommt, einzusickern.",
    icon: require("../../assets/img/giessen.png"),
    image: require("../../assets/img/giessen.png"),
    metadata: {}
  },
  'tomaten_ausgeizen': {
    id: "tomaten_ausgeizen",
    name: "Tomaten ausgeizen",
    description:
      "Zum Ausgeizen brauchen Sie normalerweise kein Werkzeug. Untersuchen Sie die Tomatenpflanze auf neue Triebe in den Achseln und prüfen Sie, welche von ihnen wachsen sollen und welche nicht. Tipp: Lassen Sie nur sehr wenige Triebe stehen, denn die klassische Stabtomate ist äußerst wüchsig und wird leicht zum Gestrüpp. Knipsen Sie dann einfach die noch sehr jungen, kleinen Achseltriebe mit den Fingernägeln von der Pflanze ab und genießen Sie den fantastischen Tomatengeruch an den Fingerspitzen. Etwas größere Triebe werden von einer zur anderen Seite geknickt bis sie von selbst abbrechen. Achtung: Die jungen Triebe dürfen nicht nach oben oder fransig abgerissen werden, denn das verursacht große Verletzungen an der Pflanze.\nHaben Sie beim Ausgeizen der Tomaten einen Trieb übersehen und er ist schon recht dick geworden, verwenden Sie zum Entfernen lieber ein scharfes Messer. Schneiden Sie den Zweig vorsichtig dicht am Haupttrieb ab, ohne diesen zu verletzen. Es ist natürlich zu beachten, dass beim Ausgeizvorgang viele kleine Risse und Wunden am Stängel der Tomate entstehen, welche Eintrittspforten für Krankheitserreger sind. Achten Sie deshalb darauf die Rissfläche so klein wie möglich zu halten. Optimalerweise waschen Sie sich die Hände oder reinigen kurz das Werkzeug, bevor Sie von einer zur nächsten Pflanze übergehen.",
    icon: require("../../assets/img/tomate.png"),
    image: require("../../assets/img/tomate.png"),
    metadata: {}
  }};

export type GardenState = {
  setupStep: number,
  setup: {
    beds: Bed[],
    location?: LatLng,
    crops: {[cropsId: string]: boolean} ,
  },
  selectedBedId : string | undefined,
  selectedTaskId: string | undefined;
  tasks: Task[];
}

export const defaultGardenState: GardenState = {
  setupStep: 0,
  setup: {
    crops: {},
    beds: [],
  },
  selectedTaskId: undefined,
  tasks: [],
  selectedBedId : undefined
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
      if(!bed){
        return state;
      }

      return {
        ...state,
        setup: {
          ...state.setup,
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
    case SET_BED_NAME:
      return {
        ...state,
        setup: {
          ...state.setup,
          beds: 
            state.setup.beds.map((item : Bed) => {
              if(item.id === action.attributes.bedId) {
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
          crops: { 
            ...state.setup.crops,
            [action.attributes.cropsId] : !state.setup.crops[action.attributes.cropsId]
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
        setup : {
          ...state.setup,
          location: {
            latitude: action.attributes.lat,
            longitude: action.attributes.lng,
          } as LatLng
        }
      };

    case LOAD_TASKS:
    let tasks : Task[] = []
      state.setup.beds.filter(element => element.typeId !== 'gewaechshaus').forEach((element, index) => {
        tasks.push({
          bedId: element.id,
          done: false,
          id: uuidv1(),
          taskType: taskTypes['giessen'].id
        } as Task)
      });
      state.setup.beds.filter(element => element.typeId === 'gewaechshaus').forEach((element, index) => {
        tasks.push({
          bedId: element.id,
          done: false,
          id: uuidv1(),
          taskType: taskTypes['tomaten_ausgeizen'].id
        } as Task)
      });

      return {
        ...state,
        tasks
      };

    default:
      return state;
  }
};
