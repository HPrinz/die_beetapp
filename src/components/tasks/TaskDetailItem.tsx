import React from "react";
import { StyleSheet, Text, Image} from "react-native";
import { Card, Button } from "react-native-elements";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RouteComponentProps, withRouter, Link } from "react-router-native";

import { RootState } from "../../reducers";
import { Bed, Task, cropTypes, Crop } from "../../reducers/garden";
import { selectTask, OtherActionResponse, setBedForTask, markTaskResolved } from "../../actions";
import { taskTypes } from "../../data/tasks";

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
      <Card title={taskTypes[task.taskType].name} image={taskTypes[task.taskType].icon} imageStyle={{height: 20, width: 20, flex: 1, alignSelf: 'center'}} >
        <Image style={{flex: 1, width: 250, height: 200}} source={taskTypes[task.taskType].image} resizeMode="contain" />
        <Text>{taskTypes[task.taskType].description}</Text>
        <Text>Beet: {task.bedId && this.props.beds.find(bed => bed.id === task.bedId) ? (this.props.beds.find(bed => bed.id === task.bedId) as Bed).name : ''}</Text>
        <Text>Kultur: {task.cropId && cropTypes.find(crop => crop.id === (task.cropId as string)) ? (cropTypes.find(crop => crop.id === (task.cropId as string)) as Crop).name : ''}</Text>
        <Button onPress={() => this.props.onMarkTaskResolved(task.id)} title='erledigt'></Button>
        <Link to="/" component={Button} onPress={() => this.props.onBack()} title='zurück' />
      </Card>
    );
  }
}

function mapStateToProps(state: RootState): StateToPropsType {
  return {
    beds: state.garden.setup.beds,
    task: state.garden.tasks.find(
      x => x.id === state.garden.selectedTaskId
    ) as Task,
    selectedId: state.garden.selectedTaskId
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
