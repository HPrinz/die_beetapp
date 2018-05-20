import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import {
  RouteComponentProps,
  withRouter,
  Switch,
  Route,
  Redirect
} from "react-router";
import { Link } from "react-router-native";
import Hello from "./Hello";
import BedType from "./BedType";
import BedSizes from "./BedSizes";
import BedPosition from "./BedPosition";
import Header from "../Header";

type OwnProps = {};

type StateToPropsType = {};

type DispatchToPropsType = {};

export type SetupProps = RouteComponentProps<{}> &
  OwnProps &
  StateToPropsType &
  DispatchToPropsType;

type SetupState = {};

class Setup extends React.Component<SetupProps, SetupState> {
  constructor(props: SetupProps) {
    super(props);
  }

  render() {
    return (
      <View style={styles.root}>
        <Header />
        <Switch>
          <Route path="/hello" component={Hello} exact />
          <Route path="/bedtype" component={BedType} exact />
          <Route path="/bedsizes" component={BedSizes} exact />
          <Route path="/bedposition" component={BedPosition} exact />
          {/* TODO: more to come! */}
          <Redirect to="/hello" />
        </Switch>
      </View>
    );
  }
}
export { Setup as PureComponent };
export default withRouter(Setup);

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    alignSelf: "center"
  }
});
