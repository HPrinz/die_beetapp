import React from "react";
import { Image, View } from "react-native";
import { Card, Text } from "react-native-elements";
import { LatLng } from 'react-native-maps';
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-native";
import { Dispatch } from "redux";
import { OtherActionResponse } from '../actions';
import { RootState } from '../reducers';
import Weather, { OpenWeather, getConditionIcon, getCondition, getRainTotalAmount, getDateString } from '../reducers/weather';


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
        if (this.props.weather == undefined) {
            return (
                <Text>Kein Wetter</Text>
            );
        }

        return (
            <Card title="Wetter">
                <Text>Aktuell</Text>
                <Text>---------------------------</Text>
                <Text>Daten von: {getDateString(this.props.weather.now as OpenWeather)}</Text>
                <Image resizeMode='contain' style={{ width: 50, height: 50 }}
                    source={{ uri: getConditionIcon(this.props.weather.now as OpenWeather) }}
                />
                <Text>Condition: {getCondition(this.props.weather.now as OpenWeather)}</Text>
                <Text>Temperatur: {this.props.weather.now.main.temp}</Text>
                <Text></Text>
                <Text></Text>
                <Text>Vorhersage</Text>
                <Text>---------------------------</Text>
                <Text>Regen insg.: {getRainTotalAmount(this.props.weather as Weather, 3)}</Text>
                <Text></Text>
                {
                    this.props.weather.forecast.list.map(u => (
                        <View>

                            <Text>Zu: {getDateString(u as OpenWeather)}</Text>
                            <Image resizeMode='contain' style={{ width: 50, height: 50 }}
                                source={{ uri: getConditionIcon(u as OpenWeather) }}
                            />
                        </View>
                    ))
                }

                <Text>Temperatur: {this.props.weather !== undefined ? this.props.weather.now.main.temp : '...'}</Text>
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
