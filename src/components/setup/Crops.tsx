import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RouteComponentProps, withRouter } from "react-router";
import { Link } from "react-router-native";
import { Button, Tile } from "react-native-elements";
import { OtherActionResponse } from "../../actions/action.type";
import { Dispatch } from "../../../node_modules/redux";
import { SetOnboardingStepCompleted } from "../../actions";
import { connect } from "react-redux";

type OwnProps = {};

type StateToPropsType = {};

type DispatchToPropsType = {
  setSetupStep: () => void;
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
          <Tile
            imageSrc={require("../../../assets/img/tomate.png")}
            title="Tomate"
            width={150}
            height={150}
            titleStyle={[styles.tileTitle]}
            containerStyle={[styles.tileBox]}
          />
          <Tile
            imageSrc={require("../../../assets/img/salat.png")}
            title="Salat"
            width={150}
            height={150}
            titleStyle={[styles.tileTitle]}
            containerStyle={[styles.tileBox]}
          />
        </View>

        <Link to="/" component={Button} title='Fertig!' onPress={() => this.props.setSetupStep()} />
      </View>
    );
  }
}

function mapDispatchToProps(dispatch: Dispatch<OtherActionResponse>): DispatchToPropsType {
  return {
    setSetupStep: () => dispatch(SetOnboardingStepCompleted(5))
  }
};


export { Crops as PureComponent };
export default withRouter(connect(
  null,
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
  tileTitle: {
    fontSize: 10,
    marginTop: 0
  },
});
