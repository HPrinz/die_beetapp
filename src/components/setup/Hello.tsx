import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RouteComponentProps, withRouter, Link } from "react-router-native";
import { Button } from "react-native-elements";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { startSetup, StartSetup } from "../../actions";

type OwnProps = {};

type StateToPropsType = {};

interface DispatchToPropsType {
  doStartSetup: () => void
};

export type HelloProps = RouteComponentProps<{}> &
  OwnProps &
  StateToPropsType &
  DispatchToPropsType;

type HelloState = {};

class Hello extends React.Component<HelloProps, HelloState> {
  constructor(props: HelloProps) {
    super(props);
  }

  render() {
    return (
      <View style={styles.root}>
        <Text>Hallo!</Text>
        <Link to="/crops" component={Button} title='Kulturen wählen' onPress={this.props.doStartSetup} />
      </View>
    );
  }
}

function mapDispatchToProps(dispatch: Dispatch<StartSetup>): DispatchToPropsType {
  return {
    doStartSetup: () => dispatch(startSetup())
  };
};

export { Hello as PureComponent };
export default withRouter(connect<null, DispatchToPropsType>(null,mapDispatchToProps)(Hello));

// styles

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    alignSelf: "center",
    flex: 1,
  }
});
