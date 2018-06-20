import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RouteComponentProps, withRouter } from "react-router";
import { Link } from "react-router-native";
import { Button, Tile } from "react-native-elements";

type OwnProps = {};

type StateToPropsType = {};

type DispatchToPropsType = {};

export type Props = RouteComponentProps<{}> &
  OwnProps &
  StateToPropsType &
  DispatchToPropsType;

type State = {};

const tileWidth: number = 150;

class BedType extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.root}>
        <Text>Beetarten auswählen:</Text>

        <View style={styles.row}>
          <Tile
            imageSrc={require("../../../assets/img/beet.jpg")}
            title="Beete"
            width={tileWidth}
            titleStyle={[styles.tileTitle]}
            containerStyle={[styles.tileBox]}
          />
          <Tile
            imageSrc={require("../../../assets/img/fruehbeet.png")}
            title="Frühbeet"
            width={tileWidth}
            titleStyle={[styles.tileTitle]}
            containerStyle={[styles.tileBox]}
          />
        </View>

        <View style={styles.row}>
         <Tile
            imageSrc={require("../../../assets/img/kuebel.png")}
            title="Kübel, Kisten"
            width={tileWidth}
            titleStyle={[styles.tileTitle]}
            containerStyle={[styles.tileBox]}
          />
          <Tile
            imageSrc={require("../../../assets/img/hochbeet.jpg")}
            title="Hochbeete"
            width={tileWidth}
            titleStyle={[styles.tileTitle]}
            containerStyle={[styles.tileBox]}
          />
        </View>

        <View style={styles.row}>
        <Tile
            imageSrc={require("../../../assets/img/gewaechshaus.jpg")}
            title="Gewächshaus"
            width={tileWidth}
            titleStyle={[styles.tileTitle]}
            containerStyle={[styles.tileBox]}
          />
          <Tile
            imageSrc={require("../../../assets/img/gewaechshaus_beheizt.png")}
            title="Gewächshaus (beheizt)"
            width={tileWidth}
            titleStyle={[styles.tileTitle]}
            containerStyle={[styles.tileBox]}
          />
        </View> />

{/* 
        Navigation: https://facebook.github.io/react-native/docs/navigation.html
        <Button title="Test" onPress={() => navigate("/bedsizes")}/>
 */}
        <Link to="/bedattributes" component={Button} title='Beete konfigurieren' />
      </View>
    );
  }
}
export { BedType as PureComponent };
export default withRouter(BedType);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    alignSelf: "center"
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  tileBox: {
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  tileTitle: {
    fontSize: 10,
    marginTop: 0
  },
});
