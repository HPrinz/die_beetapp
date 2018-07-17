import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from "react-router";
import { StyleSheet, Text, View } from 'react-native';
import { CheckBox, Button } from "react-native-elements";
import { Link } from "react-router-native";
import { Task } from '../../reducers/task';

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

class TaskListItem extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    get item() {
        return this.props.Task;
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.textcontainer}>
                    <CheckBox
                        key={this.item.name}
                        title={this.item.name}
                        checked={this.item.Done}
                        onPress={() => this.item.Done = !this.item.Done}
                    />
                    <Text style={styles.idtext}>{this.item.Description}</Text>
                </View>
                <Link to="/taskdetail" component={Button} title='Details' />
            </View>
        )
    }

}

export { TaskListItem as PureComponent };
export default withRouter(TaskListItem);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#404040'
    },

    textcontainer: {
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        margin: 2,
        padding: 4,
    },

    cbcontainer: {
        borderWidth: 1,
        borderColor: 'red',
        margin: 2
    },

    itemtext: {
        fontSize: 12,
        color: 'black'
    },

    idtext: {
        fontSize: 6,
        color: '#808080'
    }
});