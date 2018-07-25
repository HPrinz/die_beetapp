import { BedProps } from "../reducers/garden";

export const bedTypes: { [bedTypeId: string]: BedProps } = {
    'beet': {
      id: 'beet',
      name: "Beet",
      image: require("../../assets/img/beete/beet.png"),
    },
    // 'fruehbeet': {
    //   id: 'fruehbeet',
    //   name: "Frühbeet",
    //   image: require("../../assets/img/beete/fruehbeet.png"),
    // },
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
    // 'gewaechshaus_beheizt': {
    //   id: 'gewaechshaus_beheizt',
    //   name: "Gewächshaus (beheizt)",
    //   image: require("../../assets/img/beete/gewaechshaus_beheizt.png"),
    // }
  };
  