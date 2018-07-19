import React from "react";
import { StyleSheet, View, ImageSourcePropType, } from "react-native";
import { RouteComponentProps, withRouter, Link } from "react-router-native";
import { Button, Card, ListItem, Text } from "react-native-elements";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import Weather from '../reducers/weather';
import { getWeather } from "../actions/getWeather";
import { RootState } from '../reducers';
import { LatLng } from 'react-native-maps';
import { OtherActionResponse, selectTask } from '../actions';

type OwnProps = {

};

type StateToPropsType = {
    bedLocation: LatLng | undefined;
    weather: Weather | undefined
};

type DispatchToPropsType = {
    getWeather: (location: LatLng) => void;
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
                <Text>Hier die Wetterdaten</Text>
                <Text>Temperatur:{this.props.weather !== undefined ? JSON.stringify(this.props.weather) : '...'}</Text>
            </Card>
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
        getWeather: (location: LatLng) => dispatch(getWeather(location))
    }
};

export { WeatherView as PureComponent };
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps)(WeatherView));
