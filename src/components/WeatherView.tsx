import React from 'react';
import { RouteComponentProps, withRouter } from "react-router-native";
import { StyleSheet, Text, View } from 'react-native';
import { CheckBox, Button, Card } from "react-native-elements";
import { Link } from "react-router-native";

import Weather from '../models/Weather';

type OwnProps = {
    Weather: Weather
};

type StateToPropsType = {};

type DispatchToPropsType = {};

type State = {
};

export type Props = RouteComponentProps<{}> &
    OwnProps &
    StateToPropsType &
    DispatchToPropsType & State;

class WeatherView extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    get item() {
        return this.props.Weather;
    }

    render() {
        return (
            <Card title="Wetter">
                <Text>Hier die Wetterdaten</Text>
                <Link to="/" component={Button} title='zurück' />
            </Card>
        );
    }

}

export { WeatherView as PureComponent };
export default withRouter(WeatherView);

const styles = StyleSheet.create({

});