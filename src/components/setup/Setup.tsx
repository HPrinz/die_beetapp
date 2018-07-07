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
import BedAttributes from "./BedAttributes";
import BedPosition from "./BedPosition";
import Header from "../Header";
import Crops from "./Crops";
import App from "../App";
import MainView from "../MainView";

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
          <Route path="/bedattributes" component={BedAttributes} exact />
          <Route path="/bedposition" component={BedPosition} exact />
          <Route path="/crops" component={Crops} exact />
          <Route path="/finish" component={MainView} exact />
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
    alignSelf: "center",
    flex: 1,
  }
});
