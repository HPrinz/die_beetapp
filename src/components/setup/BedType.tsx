import React from "react";
import { StyleSheet, View, Image, FlatList, ListView } from "react-native";
import { RouteComponentProps, withRouter, Link } from "react-router-native";
import { Button, Badge, Text, ListItem } from "react-native-elements";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import {
  addBedType,
  removeBedType,
  setOnboardingStepCompleted,
  OtherActionResponse,
  selectBed
} from "../../actions";
import { RootState } from "../../reducers";
import { BedProps, Bed } from "../../reducers/garden";
import { bedTypes } from "../../data/bedTypes";

type OwnProps = {};

type StateToPropsType = {
  beds: Bed[];
};

interface DispatchToPropsType {
  addBedType: (bedType: string) => void;
  selectBed: (bedId: string) => void;
  removeBedType: (bedType: string) => void;
  setSetupStep: () => void;
}

export type BedTypeProps = RouteComponentProps<{}> &
  StateToPropsType &
  DispatchToPropsType &
  OwnProps;

const tileWidth: number = 140;

type State = {};

class BedType extends React.Component<BedTypeProps, State> {
  constructor(props: BedTypeProps) {
    super(props);
  }

  setCurrBedType = (bedType: string) => {
    this.setState({ currentBedType: bedType });
  };

  render() {
    return (
      <View>
        <Text h4 style={{ textAlign: "center", marginBottom: 5 }}>
          Beetarten auswählen
        </Text>

        <View style={styles.row}>
          {Object.values(bedTypes).map((bed: BedProps) => (
            <View key={bed.id} style={styles.item}>
              <Text style={styles.tileText}>{bed.name}</Text>
              <Image
                style={{ flex: 1, height: tileWidth / 2, width: tileWidth }}
                source={bed.image}
                resizeMode="contain"
              />

              {/* <View style={styles.hor}> */}
              {/* <Badge containerStyle={{borderRadius: 0, height: '100%'}} value={.length } textStyle={{ color: 'orange' }}/> */}
              <Link
                to="/bedattributes"
                component={Button}
                style={styles.plusminus}
                title="+"
                onPress={() => this.props.addBedType(bed.id)}
              />
              {/* </View> */}
            </View>
          ))};
        </View>
        <View >
          <Text style={{ textAlign: "center", fontSize: 14, fontWeight: 'bold', marginBottom: 5, marginTop: 10 }}>Aktuelle Beete: </Text>
          {this.props.beds.map(u => (
            <Link
              key={u.id}
              to="/bedattributes"
              onPress={() => this.props.selectBed(u.id)}
              component={ListItem}
              title={bedTypes[u.typeId].name + " | " + u.name}
              titleStyle={{ fontSize: 12}}
              containerStyle={{ paddingTop: 5, paddingBottom: 5 }}
              contentContainerStyle={{ paddingBottom: 5, paddingTop: 5 }}
              bottomDivider
              chevron
            />
          ))}
        </View>

        <Link
          to="/bedposition"
          style={{ margin: 10 }}
          component={Button}
          title="Gartenort zeigen"
          onPress={() => this.props.setSetupStep()}
        />
        {/* <Link
          to="/bedattributes"
          component={Button}
          title="Beete konfigurieren"
          onPress={() => this.props.setSetupStep()}
        /> */}
      </View>
    );
  }
}

function mapStateToProps(state: RootState): StateToPropsType {
  return {
    beds: state.garden.setup.beds
  };
}

function mapDispatchToProps(
  dispatch: Dispatch<OtherActionResponse>
): DispatchToPropsType {
  return {
    addBedType: (bedType: string) => dispatch(addBedType(bedType)),
    selectBed: (bedId: string) => dispatch(selectBed(bedId)),
    removeBedType: (bedType: string) => dispatch(removeBedType(bedType)),
    setSetupStep: () => dispatch(setOnboardingStepCompleted(3))
  };
}

export { BedType as PureComponent };
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(BedType)
);

const styles = StyleSheet.create({
  tileText: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    width: tileWidth,
    textAlign: "center"
  },
  hor: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center"
  },
  plusminus: {
    width: "100%"
  },
  row: {
    flex: 1,
    flexDirection: "row",
    // justifyContent: "space-between",
    // margin: 10,
    flexWrap: "wrap",
    justifyContent: "center"
  },
  item: {
    borderWidth: 0.5,
    borderColor: "#d6d7da",
    padding: 5
  },
  tileTitle: {
    // fontSize: 10,
    // marginTop: 0
  }
});
