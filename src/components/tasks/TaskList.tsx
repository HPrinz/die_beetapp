import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { RouteComponentProps, withRouter } from "react-router";
import { Link } from "react-router-native";
import { Button, Card, CheckBox, ListItem } from "react-native-elements";
import { connect } from "react-redux";
import { OtherActionResponse } from "../../actions/action.type";
import { Dispatch } from "../../../node_modules/redux";
import { RootState } from "../../reducers";
import { selectTask, markTaskResolved } from "../../actions";

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

export interface Task {
    id: string;
    name: string;
    Description: string;
    Bed: string;
    AvatarUrl: string;
    Done: boolean;
}

class TaskList extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.root}>

                <Card title="Tasks">
                    {
                        this.props.taskList
                            .map((u, i) => {
                                return (
                                    <Link
                                    to="/taskdetail"
                                    onPress={() => this.props.onSelectTask(u.id)}
                                    component={ListItem}
                                    key={u.id}
                                    title={u.name}
                                    subtitle={u.Description}   
                                    />
                                );
                            })
                    }
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
        alignItems: "center",
        alignSelf: "center",
        flex: 1,
    }
});
