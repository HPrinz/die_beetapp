import React from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import { connect } from "react-redux";
import TaskList, { Task } from "./tasks/TaskList";
import TaskDetailItem from "./tasks/TaskDetailItem";

type OwnPropsType = {
};

type StateToPropsType = {};

type DispatchToPropsType = {};

export type MainProps = StateToPropsType & DispatchToPropsType & OwnPropsType;

type MainState = {
  TaskList: Task[];
};

class MainView extends React.Component<MainProps, MainState> {
  public props: MainProps;

  constructor(props: MainProps) {
    super(props);
    this.props = props;
    this.state = {
      TaskList
        : [{
          type: "giessen",
          name: "Gießen",
          Description: "",
          AvatarUrl: "../../../assets/img/giessen.png",
          Bed: "Beet",
          Done: true,
        } as Task,
        {
          type: "giessen",
          name: "Gießen1",
          Description: "",
          AvatarUrl: "../../../assets/img/giessen.png",
          Bed: "Gewächshaus",
          Done: false,
        } as Task,
        {
          type: "geizen",
          name: "Tomaten ausgeizen",
          Description: "",
          AvatarUrl: "../../../assets/img/tomate.png",
          Bed: "Gewächshaus",
          Done: false,
        } as Task]
    }
  }

  componentDidMount() { }

  render() {
    return (

      <View style={styles.root}>
        <TaskList TaskList={this.state.TaskList} />
        <TaskDetailItem Task={this.state.TaskList[0]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

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
export default connect(
  null,
  mapDispatchToProps
)(MainView);
