import React, { StatelessComponent, Component } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { RouteComponentProps, withRouter } from "react-router";
import { Link } from "react-router-native";
import { Tile, Button } from "react-native-elements";
import { GardenState, BedProps } from "../../reducers/garden";
import { SetBedTypes } from "../../actions";
import { connect } from "../../../node_modules/@types/react-redux";

type OwnProps = {};

type StateToPropsType = {
  bedTypes: BedProps[];
};

type DispatchToPropsType = {
  updateBedTypes: SetBedTypes;
};

export type BedTypeProps = RouteComponentProps<{}> &
  OwnProps &
  StateToPropsType &
  DispatchToPropsType;

const tileWidth: number = 150;

type State = {};

class BedType extends React.Component<BedTypeProps, State> {
  constructor(props: BedTypeProps) {
    super(props);
  }

  render() {
    return (
      <View style={styles.root}>
        <Text>Beetarten auswählen:</Text>

        <View style={styles.row}>
          {this.props.bedTypes.map((bed: BedProps) => {
            <Tile
              imageSrc={require("../../../assets/img/kuebel.png")}
              title={bed.type}
              width={tileWidth}
              titleStyle={[styles.tileTitle]}
              containerStyle={[styles.tileBox]}
            />;
          })}
        </View>

        <Link
          to="/bedattributes"
          component={Button}
          onPress={() => this.props.updateBedTypes}
          title="Beete konfigurieren"
        />
      </View>
    );
  }
}

const mapStateToProps = (state: GardenState) => ({
  bedTypes: state.setup.bedTypes
});

const mapDispatchToProps: DispatchToPropsType = {
  // TODO make dynamic
  updateBedTypes: SetBedTypes([
    { type: "beet", selected: 2, image: "" },
    { type: "gewaechshaus", selected: 1, image: "" }
  ])
};

export { BedType as PureComponent };
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(BedType)
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    alignSelf: "center"
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    flexWrap: "wrap"
  },
  tileBox: {
    borderWidth: 0.5,
    borderColor: "#d6d7da"
  },
  tileTitle: {
    fontSize: 10,
    marginTop: 0
  }
});
