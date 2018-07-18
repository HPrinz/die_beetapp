import React from "react";
import { StyleSheet, Text, View, Picker } from "react-native";
import { Card, Button } from "react-native-elements";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RouteComponentProps, withRouter, Link } from "react-router-native";

import { Task} from "../../reducers/task";
import { RootState } from "../../reducers";
import { Bed } from "../../reducers/garden";
import { OtherActionResponse } from "../../actions/action.type";
import { selectTask } from "../../actions";

type OwnProps = {};

type StateToPropsType = {
  task: Task;
  selectedId: string | undefined;
  beds: Bed[];
};

type DispatchToPropsType = {
  onBack: () => void;
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
      <View style={styles.root}>
        <Card title={task.name}>
          <Text>{task.description}</Text>
          <Text>Beet:</Text>
          <Picker
            height={50}
            selectedValue={task.bed}
            onValueChange={itemValue => this.setState({ type: itemValue })}
          >
            {this.props.beds.map((i, index) => (
              <Picker.Item key={index} label={i.type + i.id} value={i.id} />
            ))}
          </Picker>
        </Card>
        <Link to="/" component={Button} onPress={() => this.props.onBack()} title='zurück' />
      </View>
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
    onBack: () => dispatch(selectTask(undefined))
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
