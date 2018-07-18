import React from "react";
import { StyleSheet, Text, View, Dimensions, Alert } from "react-native";
import { RouteComponentProps, withRouter, Link } from "react-router-native";
import MapView, { Region, Marker } from "react-native-maps";
import { Input, Button } from "react-native-elements";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { getWeather } from "../../actions/getWeather";
import { OtherActionResponse } from "../../actions/action.type";
import { setOnboardingStepCompleted } from "../../actions";

type OwnProps = {};

type StateToPropsType = {};

type DispatchToPropsType = {
  setSetupStep: () => void;
};

export type Props = RouteComponentProps<{}> &
  OwnProps &
  StateToPropsType &
  DispatchToPropsType;

type State = {
  region: Region,
  place: string,
  ready: boolean,
  map: any,
  temperature?: number
};

const window = Dimensions.get('window');

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

const initialRegion = {
  latitude: 13.405665044,
  longitude: 52.51916459,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}

class BedPostion extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.setRegion = this.setRegion.bind(this);

    this.state = {
      region: {
        latitude: initialRegion.latitude,
        longitude: initialRegion.longitude,
        latitudeDelta: initialRegion.latitudeDelta,
        longitudeDelta: initialRegion.longitudeDelta,
      },
      place: "",
      ready: false,
      map: null,
    };
  }

  moveToRegion(region: Region) {
    if (this.state.ready && this.state.map) {
      setTimeout(() => this.state.map.animateToRegion(region), 10);
    }
    this.setRegion(region);
  }

  setRegion(region: Region) {
    this.setState({ ...this.state, region });
    getWeather(region.latitude, region.longitude).then((weather) => {
      // Alert.alert(JSON.stringify(weather));
      this.setState({...this.state, temperature: weather.main.temp})
    });
  }

  componentDidMount() {
    console.log('Component did mount');
  }

  getCurrentPosition() {
    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          };
          this.moveToRegion(region);
        },
        (error) => {
          //TODO: better design
          switch (error.code) {
            case 1:
            Alert.alert("", "ERROR 1");
            break;
            default:
              Alert.alert("", "ERROR DEFAULT");
          }
        }
      );
    } catch (e) {
      Alert.alert(e.message || "");
    }
  };

  render() {
    return (

      <View style={styles.fulscreen}>
          <Text>Gartenort:</Text>
          <View style={{
            flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch', 
          }}>
          <Input placeholder='Berlin' value={this.state.place} onChangeText={(text: any) => this.setState({ place: text })}/>
        </View>

        <View style={{
          flex: 5, flexDirection: 'row', justifyContent: 'center',
          backgroundColor: 'steelblue'
        }}>

          <MapView
            showsUserLocation
            ref={map => { if(this.state.map == null) this.setState({...this.state, map })}}
            initialRegion={initialRegion}
            showsMyLocationButton={false}
            style={{ flex: 1 }}
            onMapReady={() => {this.setState({...this.state, ready: true}); this.getCurrentPosition();}}
            onRegionChange={this.setRegion}>

            {!!this.state.region.latitude && !!this.state.region.longitude && <Marker
              coordinate={{ "latitude": this.state.region.latitude, "longitude": this.state.region.longitude }}
              title={"deine Beete <3"}
            />}

          </MapView>
                    
        </View>
        <View style={{
          flex: 1, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'stretch', 
        }}>
          <Text>Temperatur:{this.state.temperature || '...'}</Text>
          <Link to="/" component={Button} title='Fertig!' onPress={() => this.props.setSetupStep()}/>
        </View>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch: Dispatch<OtherActionResponse>): DispatchToPropsType {
  return {
    setSetupStep: () => dispatch(setOnboardingStepCompleted(5)),
  }
}

export { BedPostion as PureComponent };
export default withRouter(connect(null, mapDispatchToProps)(BedPostion));

const styles = StyleSheet.create({
  fulscreen: {
    width: window.width,
    height: window.height - 60,
    alignItems: "center",
    justifyContent: 'flex-start', 
    flex: 1,
  },
  root: {
    flex: 1,

  }
});
