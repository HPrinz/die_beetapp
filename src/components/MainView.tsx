import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ListView
} from "react-native";
import { connect } from "react-redux";

import Header from "./Header.js";
import { ListItem } from "react-native-elements";

type StateToPropsType = {
  //  loadQuestions: Function
};

type DispatchToPropsType = {};

export type MainProps = StateToPropsType & DispatchToPropsType;

type MainState = {tasks: Object[]};

class MainView extends React.Component<MainProps, MainState> {
  public props: MainProps;

  constructor(props: MainProps) {
    super(props);
    this.props = props;
    this.state = {
      tasks:  [
        {
          name: 'Gießen',
          avatar_url: "../../assets/img/giessen.png",
          subtitle: 'Beet'
        },
        {
          name: 'Gießen',
          avatar_url: "../../assets/img/giessen.png",
          subtitle: 'Gewächshaus'
        },
        {
          name: 'Tomaten ausgeizen',
          avatar_url: "../../assets/img/tomate.png",
          subtitle: 'Gewächshaus'
        },
      ],
  };
  }

  fetchQuestions = () => {
    // this.props.loadQuestions();
  };

  onAsqSelected = () => {
    this.fetchQuestions();
  };

  componentDidMount() {
    return this.fetchQuestions();
  }
  
  render () {
    return (
      <View>
         { this.state.tasks.map((l : any, i) => (
        <ListItem
          key={i}
          // leftAvatar={{ source: { uri: {require(l.avatar_url)} } }}
          title={l.name}
          subtitle={l.subtitle}
        />
        ))
      }
      </View>
    )
  }

}

const styles = StyleSheet.create({
  parent: {
    flex: 1
  },

  asqcontainer: {
    padding: 10,
    flex: 1,
    backgroundColor: "#ffffff"
  },

  headercontainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },

  note: {
    padding: 10,
    fontSize: 12
  },

  qbox: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#CCCCCC"
  },

  touchableStyles: {
    marginTop: 0,
    backgroundColor: "white",
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 5
  },
  icon: {
    width: 26,
    height: 26
  }
});

const mapDispatchToProps: DispatchToPropsType = {};

export { MainView as PureComponent };
export default connect(null, mapDispatchToProps)(MainView);
