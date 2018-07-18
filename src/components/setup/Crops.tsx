import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RouteComponentProps, withRouter, Link } from "react-router-native";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Button, Tile } from "react-native-elements";

import { setOnboardingStepCompleted, addCrops, OtherActionResponse } from "../../actions";
import { Crop } from "../../reducers/garden";
import { RootState } from "../../reducers";

type OwnProps = {};

type StateToPropsType = {
  crops: Crop[]
};

type DispatchToPropsType = {
  setSetupStep: () => void;
  selectCrops: (cropsId: string) => void;
};

export type Props = RouteComponentProps<{}> &
  OwnProps &
  StateToPropsType &
  DispatchToPropsType;

type State = {};

class Crops extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.root}>
        <Text>Kulturen auswählen</Text>

        <View style={styles.row}>
        { this.props.crops.map((crop: Crop) => (
          <Tile
            key={crop.id}
            imageSrc={crop.image}
            title={crop.name}
            width={150}
            height={150}
            titleStyle={styles.tileTitle}
            containerStyle={crop.selected ? styles.tileBoxSelected : styles.tileBox}
            onPress={() => this.props.selectCrops(crop.id)}
          />
        ))}
        </View>

        <Link to="/bedtype" component={Button} title='Beete einrichten' onPress={() => this.props.setSetupStep()} />
      </View>
    );
  }
}

function mapDispatchToProps(dispatch: Dispatch<OtherActionResponse>): DispatchToPropsType {
  return {
    setSetupStep: () => dispatch(setOnboardingStepCompleted(2)),
    selectCrops: (cropsId: string) => dispatch(addCrops(cropsId))
  }
}

function mapStateToProps(state: RootState): StateToPropsType {
  return {
    crops: state.garden.setup.crops,
  }
}

export { Crops as PureComponent };
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Crops));

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    alignSelf: "center",
    flex: 1,
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
  tileBoxSelected: {
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    backgroundColor: 'green',
  },
  tileTitle: {
    fontSize: 10,
    marginTop: 0
  },
});
