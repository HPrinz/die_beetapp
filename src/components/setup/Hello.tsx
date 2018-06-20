import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RouteComponentProps, withRouter } from "react-router";
import { Link } from "react-router-native";
import { Button } from "react-native-elements";

type OwnProps = {};

type StateToPropsType = {};

type DispatchToPropsType = {};

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
        <Link to="/bedtype" component={Button} title='Beete einrichten'/>
      </View>
    );
  }
}
export { Hello as PureComponent };
export default withRouter(Hello);

// styles

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    alignSelf: "center",
    flex: 1,
  }
});
