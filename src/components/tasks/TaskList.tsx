import React from "react";
import { StyleSheet,  View, } from "react-native";
import { RouteComponentProps, withRouter, Link } from "react-router-native";
import { Button, Card, ListItem, Text } from "react-native-elements";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { OtherActionResponse } from "../../actions/action.type";
import { RootState } from "../../reducers";
import { selectTask, markTaskResolved } from "../../actions";
import { Task } from "../../reducers/task";

type OwnProps = {};

type StateToPropsType = {taskList: Task[];};

type DispatchToPropsType = {
    onSelectTask: (taskId : string) => void;
    onMarkTaskResolved: (taskId : string) => void;
};

type State = {};

export type Props = RouteComponentProps<{}> &
    OwnProps &
    StateToPropsType &
    DispatchToPropsType & State;

class TaskList extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <View>

                <Card title="Tasks">
                    { this.props.taskList.map((u, i) => (
                        <Link
                        to="/taskdetail"
                        onPress={() => this.props.onSelectTask(u.id)}
                        component={ListItem}
                        key={u.id}
                        title={u.name}
                        subtitle={u.description}   
                        />)
                    )}
                </Card>
                <Link to="/MainView" component={Button} title='Fertig!' />
                
            </View>
        );
    }
}

function mapStateToProps(state: RootState): StateToPropsType {
    return {
      taskList: state.task.tasks,
    }
  }
  
  function mapDispatchToProps(dispatch: Dispatch<OtherActionResponse>): DispatchToPropsType {
    return {
        onSelectTask: (taskId : string) => dispatch(selectTask(taskId)),
        onMarkTaskResolved: (taskId : string) => dispatch(markTaskResolved(taskId))
    }
  };

  
export { TaskList as PureComponent };
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps)(TaskList));

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: "flex-start",
    }
});
