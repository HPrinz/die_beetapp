import weather from "../components/weather";
import { cropTypes } from "../reducers/garden";

export type TaskType = {
    id: string,
    name: string,
    image: any,
    icon: any,
    description: string,
    cropTypes?: string[],
    type: 'TIP' | 'TASK',
    metadata: {}
  }
  

export const taskTypes: {[id: string]: TaskType} = {
    'saen': { 
      id: "saen",
      name: "Säen",
      description: "",
      icon: require("../../assets/img/tasks/icons/saen.png"),
      image: require("../../assets/img/tasks/pics/saen.jpg"),
      type: 'TASK',
      metadata: {}
    },
    'giessen': {
      id: "giessen",
      name: "Gießen",
      description: "Am besten morgens oder abends. Als Faustregel für die Gießmenge gilt: Je größer die Blätter, desto höher der Wasserbedarf. Mediterrane Pflanzen sind es hingegen gewöhnt, mit wenig Feuchtigkeit auszukommen. Sie überstehen auch einige trockene Tage. Am besten wartet man, bis die Erde ausgetrocknet ist und gießt dann reichlich. \n Besser einmal richtig gießen heißt auch die Devise im Gemüsebeet: Die Experten der Bayerischen Gartenakademie raten, besser 14 Liter pro Woche an einem einzigen Tag ins Beet zu gießen. Und zwar verteilt auf mehrere Stunden, so dass das Wasser jeweils Zeit bekommt, einzusickern.",
      icon: require("../../assets/img/tasks/icons/giessen.png"),
      image: require("../../assets/img/tasks/pics/giessen.jpg"),
      type: 'TASK',
      metadata: {}
    },
    'tomaten_ausgeizen': {
      id: "tomaten_ausgeizen",
      name: "Tomaten ausgeizen",
      description:
        "Zum Ausgeizen brauchen Sie normalerweise kein Werkzeug. Untersuchen Sie die Tomatenpflanze auf neue Triebe in den Achseln und prüfen Sie, welche von ihnen wachsen sollen und welche nicht. Tipp: Lassen Sie nur sehr wenige Triebe stehen, denn die klassische Stabtomate ist äußerst wüchsig und wird leicht zum Gestrüpp. Knipsen Sie dann einfach die noch sehr jungen, kleinen Achseltriebe mit den Fingernägeln von der Pflanze ab und genießen Sie den fantastischen Tomatengeruch an den Fingerspitzen. Etwas größere Triebe werden von einer zur anderen Seite geknickt bis sie von selbst abbrechen. Achtung: Die jungen Triebe dürfen nicht nach oben oder fransig abgerissen werden, denn das verursacht große Verletzungen an der Pflanze.\nHaben Sie beim Ausgeizen der Tomaten einen Trieb übersehen und er ist schon recht dick geworden, verwenden Sie zum Entfernen lieber ein scharfes Messer. Schneiden Sie den Zweig vorsichtig dicht am Haupttrieb ab, ohne diesen zu verletzen. Es ist natürlich zu beachten, dass beim Ausgeizvorgang viele kleine Risse und Wunden am Stängel der Tomate entstehen, welche Eintrittspforten für Krankheitserreger sind. Achten Sie deshalb darauf die Rissfläche so klein wie möglich zu halten. Optimalerweise waschen Sie sich die Hände oder reinigen kurz das Werkzeug, bevor Sie von einer zur nächsten Pflanze übergehen.",
      icon: require("../../assets/img/tasks/icons/tomaten_ausgeizen.png"),
      image: require("../../assets/img/tasks/pics/tomaten_ausgeizen.jpg"),
      cropTypes: ['tomato'],
      type: 'TASK',
      metadata: {}
    },
    'laub_entfernen': {
      id: "laub_entfernen",
      name: "Laub entfernen",
      description:
        "Laub entfernen, dass die Früchte beschattet. Außerdem untere Blätter bis 30cm über dem Boden entfernen gegen Krankheiten",
      icon: require("../../assets/img/tasks/icons/tomaten_ausgeizen.png"),
      image: require("../../assets/img/tasks/pics/laub_entfernen.jpg"),
      cropTypes: ['tomato'],
      type: 'TASK',
      metadata: {}
    },
    'triebe_reduzieren': {
      id: "triebe_reduzieren",
      name: "Blütentriebe auf 6 Stück reduzieren",
      description:
        "So konzentriert die Pflanze ihre Energie auf die vorhanden Triebe",
      icon: require("../../assets/img/tasks/icons/tomaten_ausgeizen.png"),
      image: require("../../assets/img/tasks/pics/laub_entfernen.jpg"),
      cropTypes: ['tomato'],
      type: 'TASK',
      metadata: {}
    },
    'ernten': {
      id: "ernten",
      name: "Ernten",
      description:
        "Die wohl schönste Arbeit im Garten - auch weil sie sich meistens selbst erklärt.",
      icon: require("../../assets/img/tasks/icons/ernten.png"),
      image: require("../../assets/img/tasks/pics/ernten.jpg"),
      type: 'TASK',
      metadata: {}
    },









    'tools': {
      id: "tools",
      name: "Geräte teilen",
      description:
        "Man muss nicht alles selbst besitzen. Mach eine Liste von den Werkzeugen, die du verleihen kannst und verteil sie an die sympathischsten Nachbarn. Vielleicht bekommst du eine Liste zurück.",
      icon: require("../../assets/img/tasks/icons/ernten.png"),
      image: require("../../assets/img/tasks/pics/tools.jpg"),
      type: 'TIP',
      metadata: {}
    },
    'regenwasser': {
      id: "regenwasser",
      name: "Regenwasser sammeln und damit gießen",
      description:
        "Regenwasser ist weicher und hat eine für die Pflanzen angenehmere Temperatur",
      icon: require("../../assets/img/tasks/icons/giessen.png"),
      image: require("../../assets/img/tasks/pics/giessen.jpg"),
      type: 'TIP',
      metadata: {}
    },
    'bienenhotel': {
      id: "bienenhotel",
      name: "Bienenhotel bauen",
      description:
        "Ohne Bienen kein Gemüse. Hilf ihnen, indem du ihnen mit Bambusröhren einen Rückzugsort bietest",
      icon: require("../../assets/img/tasks/icons/biene.png"),
      image: require("../../assets/img/tasks/pics/biene.jpg"),
      type: 'TIP',
      metadata: {}
    },





};
  