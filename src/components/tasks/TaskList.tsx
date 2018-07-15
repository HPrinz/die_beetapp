import React from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { RouteComponentProps, withRouter } from "react-router";
import { Link } from "react-router-native";
import { Button, Card, CheckBox, ListItem } from "react-native-elements";
import TaskListItem from "./TaskListItem";
import TaskDetailItem, { Task } from "./TaskDetailItem";

type OwnProps = {
    TaskList: Task[];
};

type StateToPropsType = {};

type DispatchToPropsType = {};

type State = {
};

export type Props = RouteComponentProps<{}> &
    OwnProps &
    StateToPropsType &
    DispatchToPropsType & State;

export interface Task {
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
            <ScrollView style={{ backgroundColor: 'red' }} contentContainerStyle={styles.root}>

                <Card title="Tasks">
                    {
                        this.props.TaskList
                            .map((u, i) => {
                                return (
                                    <TaskListItem Task={u} key={u.name} />
                                );
                            })
                    }
                </Card>
            </ScrollView>
        );
    }
}
export { TaskList as PureComponent };
export default withRouter(TaskList);

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: "flex-start",
    }
});
