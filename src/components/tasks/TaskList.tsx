import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { RouteComponentProps, withRouter } from "react-router";
import { Link } from "react-router-native";
import { Button, Card, CheckBox, ListItem } from "react-native-elements";

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
            <View style={styles.root}>

                <Card title="Tasks">
                    {
                        this.props.TaskList
                            .map((u, i) => {
                                return (
                                    //<CheckBox
                                    //    key={u.Name}
                                    //    title={u.Name}
                                    //    checked={u.Done}
                                    //    onPress={() => u.Done = !u.Done}
                                    ///>
                                    <ListItem
                                        key={u.name}
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
export { TaskList as PureComponent };
export default withRouter(TaskList);

const styles = StyleSheet.create({
    root: {
        alignItems: "center",
        alignSelf: "center",
        flex: 1,
    }
});
