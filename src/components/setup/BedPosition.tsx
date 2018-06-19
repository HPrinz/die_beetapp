import React from "react";
import { StyleSheet, Text, TextInput, View, Dimensions, Alert, Platform } from "react-native";
import { RouteComponentProps, withRouter } from "react-router";
import { Link } from "react-router-native";
import MapView, { Region } from "react-native-maps";
import { Marker } from "react-native-maps";

type OwnProps = {};

type StateToPropsType = {};

type DispatchToPropsType = {};

export type Props = RouteComponentProps<{}> &
  OwnProps &
  StateToPropsType &
  DispatchToPropsType;

type State = {
  region: Region,
  place: string,
  ready: boolean
  map: Map;
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

export default class BedPostion extends React.Component<Props, State> {

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

  setRegion(region: Region) {
    if (this.state.ready && this.state.map) {
      setTimeout(() => this.state.map.animateToRegion(region), 10);
    }
    this.setState({ ...this.state, region });
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
          this.setRegion(region);
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
      alert(e.message || "");
    }
  };

  render() {
    return (

      <View style={styles.fulscreen}>

        <View style={{
          flex: 0.5, flexDirection: 'row', justifyContent: 'space-between',
          backgroundColor: 'powderblue'
        }}>
          <Text>Gartenort:</Text>
        </View>
        <View style={{
          flex: 0.5, flexDirection: 'row', justifyContent: 'space-between', width: 200,
          backgroundColor: 'powderblue'
        }}>
          <TextInput
            style={{ width: 200, borderColor: 'gray', borderWidth: 1 }}
            //onChangeText={(text) => this.setState({ text })}
            value={this.state.place}
          />
        </View>

        <View style={{
          flex: 4, flexDirection: 'row', justifyContent: 'space-between',
          backgroundColor: 'steelblue'
        }}>

          <MapView
            showsUserLocation
            ref={map => { if(this.state.map == null) this.setState({...this.state, map })}}
            initialRegion={initialRegion}
            showsMyLocationButton={false}
            style={{ flex: 4 }}
            onMapReady={() => {this.setState({...this.state, ready: true}); this.getCurrentPosition();}}
            onRegionChange={(region: Region) =>  this.setState({ region })}>

            {!!this.state.region.latitude && !!this.state.region.longitude && <Marker
              coordinate={{ "latitude": this.state.region.latitude, "longitude": this.state.region.longitude }}
              title={"Your Location"}
            />}

          </MapView>
        </View>
        <View style={{
          flex: 1, flexDirection: 'row', justifyContent: 'space-between',
          backgroundColor: 'blue'
        }}>
          <Link to="/bedposition">
            <Text>Gartenort zeigen</Text>
          </Link>
        </View>
      </View>
    );
  }
}
//export { BedPostion as PureComponent };
//export default withRouter(BedPostion);

const styles = StyleSheet.create({
  fulscreen: {
    width: window.width,
    height: window.height,
    alignItems: "center",
    alignSelf: "center"
  },
  root: {
    flex: 1,

  }
});
