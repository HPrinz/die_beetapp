import React from "react";
import { StyleSheet, Text, View, Picker } from "react-native";
import { RouteComponentProps, withRouter } from "react-router";
import { Card, Input } from "react-native-elements";
import { Task, tasktypes } from "../../reducers/task";
import { RootState } from "../../reducers";
import { connect } from "react-redux";

type OwnProps = {};

type StateToPropsType = {
    task: Task
};

type DispatchToPropsType = {};

type State = {};

export type Props = RouteComponentProps<{}> &
    OwnProps &
    StateToPropsType &
    DispatchToPropsType & State;



class TaskDetailItem extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        const buttons = ['Hello', 'World', 'Buttons']

        const {task} =  this.props
        if(!task){
            // KAWUMM
        }
        return (
            <View style={styles.root}>
                <Card title="Task">
                    <Text>Art</Text>
                    <Picker
                        selectedValue={task.type}
                        onValueChange={itemValue => this.setState({ type: itemValue })}>
                        {tasktypes.map((i, index) => (
                            <Picker.Item key={index} label={i.label} value={i.value} />
                        ))}
                    </Picker>
                    <Text>Ort</Text>
                    <Input placeholder='TaskDescription' value={task.Bed} onChangeText={(text: any) => this.setState({ Bed: text })} />
                    <Text>Beschreibung</Text>
                    <Input placeholder='TaskDescription' value={task.Description} onChangeText={(text: any) => this.setState({ Description: text })} />
                </Card>
            </View>
        );
    }
}

function mapStateToProps(state: RootState): StateToPropsType {
    return {
      task: state.task.tasks.find(x => x.id === state.task.selectedTaskId) as Task,
    }
  }

export { TaskDetailItem as PureComponent };
export default withRouter(connect(mapStateToProps)(TaskDetailItem));

const styles = StyleSheet.create({
    root: {
        flex: 1,
    }
});
