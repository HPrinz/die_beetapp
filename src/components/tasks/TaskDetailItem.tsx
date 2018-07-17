import React from "react";
import { StyleSheet, Text, View, Picker } from "react-native";
import { RouteComponentProps, withRouter } from "react-router";
import { Card, Input } from "react-native-elements";

type OwnProps = {
    Task: Task;
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
    type: string;
    name: string;
    Description: string;
    Bed: string;
    AvatarUrl: string;
    Done: boolean;
}

const tasktypes = [
    {
        label: 'Gießen',
        value: 'giessen',
    },
    {
        label: 'Pflanzen',
        value: 'planzen',
    },
    {
        label: 'Ernten',
        value: 'ernten',
    },
    {
        label: 'Ausgeizen',
        value: 'ausgeizen',
    }
]

class TaskDetailItem extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

    }

    render() {
        const buttons = ['Hello', 'World', 'Buttons']

        return (
            <View style={styles.root}>
                <Card title="Task">
                    <Text>Art</Text>
                    <Picker
                        selectedValue={this.props.Task.type}
                        onValueChange={itemValue => this.setState({ type: itemValue })}>
                        {tasktypes.map((i, index) => (
                            <Picker.Item key={index} label={i.label} value={i.value} />
                        ))}
                    </Picker>
                    <Text>Ort</Text>
                    <Input placeholder='TaskDescription' value={this.props.Task.Bed} onChangeText={(text: any) => this.setState({ Description: text })} />
                    <Text>Beschreibung</Text>
                    <Input placeholder='TaskDescription' value={this.props.Task.Description} onChangeText={(text: any) => this.setState({ Description: text })} />
                </Card>
            </View>
        );
    }
}
export { TaskDetailItem as PureComponent };
export default withRouter(TaskDetailItem);

const styles = StyleSheet.create({
    root: {
        flex: 1,
    }
});
