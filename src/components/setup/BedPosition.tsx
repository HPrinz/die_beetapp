import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { RouteComponentProps, withRouter } from "react-router";
import { Link } from "react-router-native";
import MapView from "react-native-maps";
import { Marker } from 'react-native-maps';

type OwnProps = {};

type StateToPropsType = {};

type DispatchToPropsType = {};

export type Props = RouteComponentProps<{}> &
  OwnProps &
  StateToPropsType &
  DispatchToPropsType;

type State = {
  longitude: number,
  latitude: number
};

class BedPostion extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      latitude: 0,
      longitude: 0
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("wokeeey");
        console.log(position);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      }
    );
  }

  render() {
    return (
      //<View style={styles.root}>
      //  <Text>Gartenort:</Text>


      <MapView style={styles.map} initialRegion={{
        latitude: 13.356533,
        longitude: 52.639892,
        latitudeDelta: 1,
        longitudeDelta: 1,
      }}>

        {!!this.state.latitude && !!this.state.longitude && <Marker
          coordinate={{ "latitude": this.state.latitude, "longitude": this.state.longitude }}
          title={"Your^ Location"}
        />}

      </MapView>

      //  <Link to="/bedposition">
      //    <Text>Gartenort zeigen</Text>
      //  </Link>
      //</View>


    );
  }
}
export { BedPostion as PureComponent };
export default withRouter(BedPostion);

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    alignSelf: "center"
  },
  map: {
    position: 'absolute',
    top: 15,
    left: 0,
    right: 0,
    bottom: 0
  },
});
