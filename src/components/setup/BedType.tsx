import React, { StatelessComponent, Component } from "react";
import { StyleSheet, Text, View, Alert, Image, ImageSourcePropType } from "react-native";
import { RouteComponentProps, withRouter } from "react-router";
import { Link } from "react-router-native";
import { Tile, Button, Badge, Card } from "react-native-elements";
import { AddBedType, RemoveBedType } from "../../actions";
import { connect } from "react-redux";
import { RootState } from "../../reducers";
import { Dispatch } from "../../../node_modules/redux";
import { BedProps } from "../../reducers/garden";
import { OtherActionResponse } from "../../actions/action.type";

type OwnProps = {
};

type StateToPropsType = {
  bedTypes: {[bedType: string]: BedProps};
};

interface DispatchToPropsType {
  addBedType: (bedType : string) => void;
  removeBedType: (bedType : string) => void;
};

export type BedTypeProps = RouteComponentProps<{}> &
  StateToPropsType &
  DispatchToPropsType &
  OwnProps;

const tileWidth: number = 130;

type State = {};

class BedType extends React.Component<BedTypeProps, State> {

  constructor(props: BedTypeProps) {
    super(props);
  }

  setCurrBedType = (bedType : string) => {
    this.setState({ currentBedType: bedType });
  }

  render() {
    return (
      <View>
        <Text>Beetarten auswählen:</Text>

        <View style={styles.row}>
          {Object.values(this.props.bedTypes).map((bed: BedProps) => (
            <View key={bed.type} style={styles.item} >
              <Image style={{flex:1, height: tileWidth/2, width: tileWidth}} source={bed.image} resizeMode="contain" />
              <Text style={styles.tileText}>{bed.type}</Text>
  
              <View style={styles.hor}>
                <Button style={styles.plusminus} title="-" onPress={() => this.props.removeBedType(bed.type)} />
                <Badge value={bed.selected} textStyle={{ color: 'orange' }}/>
                <Button style={styles.plusminus} title="+" onPress={() => this.props.addBedType(bed.type)} />
              </View>
            </View>
          ))};
        </View>

        <Link
          to="/bedattributes"
          component={Button}
          title="Beete konfigurieren"
        />
      </View>
    );
  }
}

function mapStateToProps(state: RootState): StateToPropsType {
  return {
    bedTypes: state.garden.setup.bedTypes
  }
}

function mapDispatchToProps(dispatch: Dispatch<OtherActionResponse>): DispatchToPropsType {
  return {
    addBedType: (bedType : string) => dispatch(AddBedType(bedType)),
    removeBedType: (bedType : string) => dispatch(RemoveBedType(bedType))
  }
};

export { BedType as PureComponent };
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BedType));

const styles = StyleSheet.create({
  tileText: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    width: tileWidth,
  },
  hor: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  plusminus: {
  },
  row: {
    flex: 1,
    flexDirection: "row",
    // justifyContent: "space-between",
    // margin: 10,
    flexWrap: "wrap"
  },
  item: {
    borderWidth: 0.5,
    borderColor: "#d6d7da",
    padding: 10,
  },
  tileTitle: {
    // fontSize: 10,
    // marginTop: 0
  }
});
