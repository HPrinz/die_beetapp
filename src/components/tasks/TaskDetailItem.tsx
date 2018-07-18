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
import { selectTask, OtherActionResponse, setBedForTask } from "../../actions";

type OwnProps = {};

type StateToPropsType = {
  task: Task;
  selectedId: string | undefined;
  beds: Bed[];
};

type DispatchToPropsType = {
  onBack: () => void;
  setBedForTask: (taskId : string, bedId: string) => void;
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
      <Card title={task.name} image={task.image} imageStyle={{height: 220, opacity: 0.4}}>
        <Text>{task.description}</Text>
        <Text>Beet:</Text>
        <Picker
          style={{ height: 50 }}
          selectedValue={task.bed}
          onValueChange={itemValue => this.props.setBedForTask(task.id, itemValue)}
        >
          {this.props.beds.map(i => (
            <Picker.Item key={i.id} label={i.name} value={i.id} />
          ))}
        </Picker>
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
    setBedForTask: (taskId : string, bedId: string) => dispatch(setBedForTask(taskId, bedId))
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
