import React from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import { connect } from "react-redux";
import TaskList, { Task } from "./tasks/TaskList";
import { RootState } from "../reducers";
import { Redirect } from "react-router-native";

type OwnPropsType = {
};

type StateToPropsType = {
  isSetUp: boolean;
  selectedTask: string | undefined;
  taskList: Task[];
};

type DispatchToPropsType = {};

export type MainProps = StateToPropsType & DispatchToPropsType & OwnPropsType;

type MainState = {};

class MainView extends React.Component<MainProps, MainState> {

  constructor(props: MainProps) {
    super(props);
  }

  componentDidMount() { }

  render() {
    return (
      <View style={styles.root}>
        {this.props.isSetUp  === false ? <Redirect to="/hello" push /> : 
        this.props.selectedTask  === undefined ? <Redirect to="/taskdetail" push /> : 
        MainView }

      </View>
    );
  }
}

const mapStateToProps = (state: RootState): StateToPropsType => ({
  isSetUp: state.garden.setupStep == 5,
  taskList: state.task.tasks,
  selectedTask : state.task.selectedTaskId,
});

const mapDispatchToProps: DispatchToPropsType = {
  
};

export { MainView as PureComponent };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainView);


const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    alignSelf: "center",
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
