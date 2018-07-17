import React from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import { connect } from "react-redux";
import TaskList, { Task } from "./tasks/TaskList";
<<<<<<< HEAD
import { RootState } from "../reducers";
import { Redirect } from "react-router-native";
=======
import TaskDetailItem from "./tasks/TaskDetailItem";
>>>>>>> d78108fba1d391c038e32c3dc2196cdc30ae2c88

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
<<<<<<< HEAD
=======
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
>>>>>>> d78108fba1d391c038e32c3dc2196cdc30ae2c88
  }

  componentDidMount() { }

  render() {
    return (

      <View style={styles.root}>
<<<<<<< HEAD
        {this.props.isSetUp  === false ? <Redirect to="/hello" push /> : 
        this.props.selectedTask  === undefined ? <Redirect to="/taskdetail" push /> : 
        MainView }

=======
        <TaskList TaskList={this.state.TaskList} />
        <TaskDetailItem Task={this.state.TaskList[0]} />
>>>>>>> d78108fba1d391c038e32c3dc2196cdc30ae2c88
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
