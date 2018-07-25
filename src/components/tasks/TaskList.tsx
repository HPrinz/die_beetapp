import React from "react";
import { StyleSheet, View, ImageSourcePropType, } from "react-native";
import { RouteComponentProps, withRouter, Link } from "react-router-native";
import { Button, Card, ListItem, Text } from "react-native-elements";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { RootState } from "../../reducers";
import { selectTask, markTaskResolved, OtherActionResponse, loadTasks, setWeather } from "../../actions";
import { Bed, Task, cropTypes, Crop } from "../../reducers/garden";
import { LatLng } from "react-native-maps";
import { getWeather } from "../../actions/getWeather";
import { taskTypes } from "../../data/tasks";
import Weather from "../../reducers/weather";
import WeatherView from "../WeatherView";
import moment, { Moment } from 'moment' 
import 'moment/min/moment-with-locales';
import 'moment/locale/de';

type OwnProps = {};

type StateToPropsType = {
    taskList: Task[];
    // showTasks: string[];
    beds: Bed[];
    bedLocation: LatLng;
    weather: Weather | undefined;
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
        this._getSubtitle = this._getSubtitle.bind(this);
        this._fetchWeather = this._fetchWeather.bind(this);
    }

    componentDidMount(){
        if(!this.props.weather) {
            this._fetchWeather(this.props.bedLocation)
        }else{
            this.props.loadTasks();
        }
    }

    private _fetchWeather(location: LatLng) {
        getWeather(location).then((weather) => {
            if(weather) this.props.setWeather(weather);
            this.props.loadTasks();
        });
    }

    private _onUpdateTasks() {
        this._fetchWeather(this.props.bedLocation);
        return () => this.props.loadTasks();
    }

    private _getSubtitle(task : Task) {
        // console.log('0 ' + JSON.stringify(task));
        const bed = task.bedId && this.props.beds.find(bed => bed.id === task.bedId) ? (this.props.beds.find(bed => bed.id === task.bedId) as Bed) : undefined;
        // console.log('1 ' + JSON.stringify(task.cropId));
        const crop = task.cropId && cropTypes.find(crop => crop.id === (task.cropId as string)) ? (cropTypes.find(crop => crop.id === (task.cropId as string)) as Crop) : undefined;
        // console.log('2 ' + JSON.stringify(crop));
        const bedText = !bed ? '' : 'im ' + bed.name + '';   
        const cropText = !crop ? '' : 'bei den ' + crop.name + 'n';   
        return bedText + cropText;
    }

    render() {
        return (
            <View>
                <WeatherView />
                <Card title="Tasks">
                    {this.props.taskList.filter(u => u.category === 'TASK').map(u => (
                        <Link
                            to="/taskdetail"
                            onPress={() => this.props.onSelectTask(u.id)}
                            component={ListItem}
                            key={u.id}
                            title={taskTypes[u.taskType].name + (taskTypes[u.taskType].id === 'giessen' && u.amount ? ' (' + Math.round(u.amount) + ' liter)': '')}
                            subtitle={this._getSubtitle(u)}
                            leftAvatar={{ source: taskTypes[u.taskType].icon, overlayContainerStyle: u.done ? {backgroundColor: '#efefef' } : {backgroundColor: '#cce8e2'} }}
                            titleStyle={ u.done ? { fontSize: '14', fontWeight: 'light', color: 'grey'} : { fontSize: '14', fontWeight: 'light' }}
                            subtitleStyle={ { fontSize: '12', color: 'grey' }}
                            containerStyle={{paddingTop: 5, paddingBottom :10}}
                        />)
                    )}
                </Card>
                <Card title="Tips">
                    {this.props.taskList.filter(u => u.category === 'TIP').map(u => (
                        <Link
                            to="/taskdetail"
                            onPress={() => this.props.onSelectTask(u.id)}
                            component={ListItem}
                            key={u.id}
                            title={taskTypes[u.taskType].name + (taskTypes[u.taskType].id === 'giessen' && u.amount ? ' (' + Math.round(u.amount) + ' liter)': '')}
                            subtitle={this._getSubtitle(u)}
                            leftAvatar={{ source: taskTypes[u.taskType].icon, overlayContainerStyle: u.done ? {backgroundColor: '#efefef' } : {backgroundColor: '#cce8e2'} }}
                            titleStyle={ u.done ? { fontSize: '14', fontWeight: 'light', color: 'grey'} : { fontSize: '14', fontWeight: 'light' }}
                            subtitleStyle={ { fontSize: '12', color: 'grey' }}
                            containerStyle={{paddingTop: 5, paddingBottom :10}}
                        />)
                    )}
                </Card>

                {/* <Button title='Tasks aktualisieren' onPress={this._onUpdateTasks()} style={styles.button} /> */}
                <Link to="/hello" component={Button} title='Garten einrichten' style={styles.button} />

                {/* <Button title='Wetter laden' onPress={() => this.getweather(this.props.bedLocation)} style={styles.button} /> */}
            </View >
        );
    }
}


function mapStateToProps(state: RootState): StateToPropsType {
    return {
        taskList: state.garden.tasks.filter((task:Task) => {
            if(task.done && moment().diff(task.done as Moment, 'seconds') >= 15) return false;
            return true;
        }),
        beds: state.garden.setup.beds,
        bedLocation: state.garden.setup.location as LatLng,
        weather: state.garden.weather,
        // showTasks: state.garden.tasks.filter((task:Task) => {
        //     if(task.done && isMoment(task.done) && moment().diff(task.done, 'seconds') >= 15) return false;
        //     return true;
        // }
        // ).map(task => task.id);
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