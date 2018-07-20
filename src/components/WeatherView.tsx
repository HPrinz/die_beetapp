import React from "react";
import { Image } from "react-native";
import { Card, Text } from "react-native-elements";
import { LatLng } from 'react-native-maps';
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-native";
import { Dispatch } from "redux";
import { OtherActionResponse } from '../actions';
import { RootState } from '../reducers';
import Weather, { getHimmel, getIcon, OpenWeather } from '../reducers/weather';


type OwnProps = {

};

type StateToPropsType = {
    bedLocation: LatLng | undefined;
    weather: Weather | undefined
};

type DispatchToPropsType = {
};

type State = {
};

export type Props = RouteComponentProps<{}> &
    OwnProps &
    StateToPropsType &
    DispatchToPropsType;

class WeatherView extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <Card title="Wetter">
                <Text>{getIcon(this.props.weather as Weather)}</Text>
                <Image resizeMode='contain' style={{ width: 50, height: 50 }}
                    source={{ uri: getIcon(this.props.weather as Weather) }}
                // source={{ uri: 'http://openweathermap.org/img/w/10d.png' }}
                />
                <Text>Temperatur: {this.props.weather !== undefined ? this.props.weather.waether.main.temp : '...'}</Text>
                <Text>Himmel: {this.props.weather !== undefined ? getHimmel(this.props.weather.waether as OpenWeather) : '...'}</Text>
                <Text>---------------------------</Text>
                <Text>Hier die Wetterdaten</Text>
                <Text>Temperatur:{this.props.weather !== undefined ? JSON.stringify(this.props.weather, null, 4) : '...'}</Text>
            </Card >
        );
    }

}

function mapStateToProps(state: RootState): StateToPropsType {
    return {
        bedLocation: state.garden.setup.location,
        weather: state.garden.weather
    }
}

function mapDispatchToProps(dispatch: Dispatch<OtherActionResponse>): DispatchToPropsType {
    return {
    }
};

export { WeatherView as PureComponent };
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps)(WeatherView));
