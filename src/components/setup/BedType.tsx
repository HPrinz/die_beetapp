import React, { StatelessComponent, Component } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { RouteComponentProps, withRouter } from "react-router";
import { Link } from "react-router-native";
import { Tile, Button } from "react-native-elements";
import { SetBedTypes } from "../../actions";
import { connect } from "react-redux";
import { RootState } from "../../reducers";
import { Dispatch } from "../../../node_modules/redux";
import { BedProps } from "../../reducers/garden";

type OwnProps = {};

type StateToPropsType = {
  bedTypes: BedProps[];
};

interface DispatchToPropsType {
  updateBedTypes: () => void
};

export type BedTypeProps = RouteComponentProps<{}> &
  StateToPropsType &
  DispatchToPropsType  &
  OwnProps;

const tileWidth: number = 150;

type State = {};

class BedType extends React.Component<BedTypeProps, State> {

  constructor(props: BedTypeProps) {
    console.log(JSON.stringify(props))
    super(props);
  }

  render() {
    return (
      <View style={styles.root}>
        <Text>Beetarten auswählen:</Text>

        <View style={styles.row}>
          {this.props.bedTypes.map((bed: BedProps) => (
            <Tile
              imageSrc={bed.image}
              title={bed.type}
              width={tileWidth}
              titleStyle={[styles.tileTitle]}
              containerStyle={[styles.tileBox]}
            />
          ))};
        </View> 

        <Link
          to="/bedattributes"
          component={Button}
          onPress={this.props.updateBedTypes}
          title="Beete konfigurieren"
        />
      </View>
    );
  }
}

function  mapStateToProps(state: RootState): StateToPropsType{
  return {
    bedTypes: state.garden.setup.bedTypes
  }
}

function mapDispatchToProps(dispatch: Dispatch<SetBedTypes>): DispatchToPropsType {
  return {
    updateBedTypes: () => dispatch(SetBedTypes([]))
  }
};

export { BedType as PureComponent };
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BedType));

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
