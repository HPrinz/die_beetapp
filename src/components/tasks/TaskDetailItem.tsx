import React from "react";
import { StyleSheet, Text, View, Picker } from "react-native";
import { Card, Button } from "react-native-elements";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RouteComponentProps, withRouter, Link } from "react-router-native";
import FitImage from 'react-native-fit-image';

import { Task} from "../../reducers/task";
import { RootState } from "../../reducers";
import { Bed } from "../../reducers/garden";
import { selectTask, OtherActionResponse, setBedForTask, markTaskResolved } from "../../actions";

type OwnProps = {};

type StateToPropsType = {
  task: Task;
  selectedId: string | undefined;
  beds: Bed[];
};

type DispatchToPropsType = {
  onBack: () => void;
  setBedForTask: (taskId : string, bedId: string) => void;
  onMarkTaskResolved: (taskId : string) => void;
};

type State = {};

export type Props = RouteComponentProps<{}> &
  OwnProps &
  StateToPropsType &
  DispatchToPropsType &
  State;

class TaskDetailItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { task } = this.props;
    if (!task) {
      return <Text>NO ITEM {this.props.selectedId}</Text>;
    }
    return (
      <Card title={task.name} image={task.image} imageStyle={{height: 20, width: 20, flex: 1, alignSelf: 'center'}} >
        <Text>{task.description}</Text>
        <Text>Beet:</Text>
        <Text>{task.bed}</Text>
        <Button onPress={() => this.props.onMarkTaskResolved(task.id)} title='erledigt'></Button>
        <Link to="/" component={Button} onPress={() => this.props.onBack()} title='zurück' />
      </Card>
    );
  }
}

function mapStateToProps(state: RootState): StateToPropsType {
  return {
    beds: state.garden.setup.beds,
    task: state.task.tasks.find(
      x => x.id === state.task.selectedTaskId
    ) as Task,
    selectedId: state.task.selectedTaskId
  };
}

function mapDispatchToProps(
  dispatch: Dispatch<OtherActionResponse>
): DispatchToPropsType {
  return {
    onBack: () => dispatch(selectTask(undefined)),
    setBedForTask: (taskId : string, bedId: string) => dispatch(setBedForTask(taskId, bedId)),
    onMarkTaskResolved: (taskId : string) => dispatch(markTaskResolved(taskId)),
  };
}

export { TaskDetailItem as PureComponent };
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TaskDetailItem)
);

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
});
