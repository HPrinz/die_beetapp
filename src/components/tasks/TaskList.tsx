import React from "react";
import { StyleSheet, View, ImageSourcePropType, } from "react-native";
import { RouteComponentProps, withRouter, Link } from "react-router-native";
import { Button, Card, ListItem, Text } from "react-native-elements";
import { connect } from "react-redux";
import { Dispatch } from "redux";


import { RootState } from "../../reducers";
import { selectTask, markTaskResolved, OtherActionResponse, loadTasks, setWeather } from "../../actions";
import { Bed, Task } from "../../reducers/garden";
import { LatLng } from "react-native-maps";
import { getWeather } from "../../actions/getWeather";
import { taskTypes } from "../../data/tasks";
import Weather from "../../reducers/weather";
import WeatherView from "../WeatherView";

type OwnProps = {};

type StateToPropsType = {
    taskList: Task[];
    beds: Bed[];
    bedLocation: LatLng;
};

type DispatchToPropsType = {
    onSelectTask: (taskId: string) => void;
    setWeather: (weather: Weather) => void;
    onMarkTaskResolved: (taskId: string) => void;
    loadTasks: () => void;
};

type State = {};

export type Props = RouteComponentProps<{}> &
    OwnProps &
    StateToPropsType &
    DispatchToPropsType;

class TaskList extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this._onUpdateTasks = this._onUpdateTasks.bind(this);
    }

    getweather(location: LatLng) {
        getWeather(location).then((weather) => {
            if(weather) this.props.setWeather(weather);
        });
    }

    private _onUpdateTasks() {
        this.getweather(this.props.bedLocation);
        return () => this.props.loadTasks();
    }
    

    render() {
        return (
            <View>
                <WeatherView />
                <Card title="Tasks">
                    {this.props.taskList.map(u => (
                        <Link
                            to="/taskdetail"
                            onPress={() => this.props.onSelectTask(u.id)}
                            component={ListItem}
                            key={u.id}
                            title={taskTypes[u.taskType].name}
                            subtitle={'in ' + (this.props.beds.find(bed => bed.id === u.bedId) ? (this.props.beds.find(bed => bed.id === u.bedId) as Bed).name : '')}
                            leftAvatar={{ source: taskTypes[u.taskType].icon }}
                        />)
                    )}
                </Card>

                <Button title='Tasks aktualisieren' onPress={this._onUpdateTasks()} style={styles.button} />
                <Link to="/hello" component={Button} title='Garten einrichten' style={styles.button} />

                {/* <Button title='Wetter laden' onPress={() => this.getweather(this.props.bedLocation)} style={styles.button} /> */}
            </View >
        );
    }
}


function mapStateToProps(state: RootState): StateToPropsType {
    return {
        taskList: state.garden.tasks,
        beds: state.garden.setup.beds,
        bedLocation: state.garden.setup.location as LatLng,
    }
}

function mapDispatchToProps(dispatch: Dispatch<OtherActionResponse>): DispatchToPropsType {
    return {
        onSelectTask: (taskId: string) => dispatch(selectTask(taskId)),
        setWeather: (weather: Weather) => dispatch(setWeather(weather)),
        onMarkTaskResolved: (taskId: string) => dispatch(markTaskResolved(taskId)),
        loadTasks: () => dispatch(loadTasks())
    }
};


export { TaskList as PureComponent };
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps)(TaskList));

const styles = StyleSheet.create({
    button: {
        margin: 10,
        marginBottom: 0
    }
});