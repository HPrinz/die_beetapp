import React from "react";
import { Image, View, StyleSheet, ScrollView } from "react-native";
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
        const debug = false;

        if (this.props.weather == undefined) {
            return (
                <Text>Keien Wetterdaten</Text>
            );
        }

        return (
            <View>
                 <ScrollView horizontal={true} style={styles.hor}>
                    <View>
                        <Text style={styles.textCenterSmall}>jetzt</Text>
                        <Image resizeMode='contain' style={{ width: 50, height: 50 }}
                            source={{ uri: getConditionIcon(this.props.weather.now as OpenWeather) }}
                        />
                        <Text style={styles.textCenter}>{Math.round(this.props.weather.now.main.temp)}&#8451;</Text>
                    </View>

                    {this.props.weather.forecast.list.slice(0, 8).map((u : OpenWeather)=> (
                        <View>
                            <Text style={styles.textCenterSmall}>{getDateString(u).slice(11, 16)}</Text>
                            <Image resizeMode='contain' style={{ width: 50, height: 50 }}
                                source={{ uri: getConditionIcon(u as OpenWeather) }}
                            />
                            <Text style={styles.textCenter}>{Math.round(u.main.temp)}&#8451;</Text>
                        </View>
                    ))}
                </ScrollView>

            { debug && <Card title="Wetter">
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
                {/* <Text>Temperatur:{this.props.weather !== undefined ? JSON.stringify(this.props.weather, null, 4) : '...'}</Text> */}
            </Card > }
            </View>
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

    const styles = StyleSheet.create({
        hor:{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center'
        },
        textCenter:{
            textAlign: 'center',
            fontSize: 12,
            marginTop: 0,
            paddingTop: 0,
        },
        textCenterSmall:{
            textAlign: 'center',
            fontSize: 10,
        }
       
      });