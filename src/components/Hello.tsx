import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { RouteComponentProps, withRouter } from "react-router";

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
  //this.props.history.push("/beet")
  onNext = () => {};

  render() {
    return (
      <View style={styles.root}>
        <Text style={styles.greeting}>Hallo!</Text>

        <View style={styles.buttons}>
          <View style={styles.button}>
            <Button title="next" onPress={this.onNext} color="red" />
          </View>
        </View>
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
    alignSelf: "center"
  },
  buttons: {
    flexDirection: "row",
    minHeight: 70,
    alignItems: "stretch",
    alignSelf: "center",
    borderWidth: 5
  },
  button: {
    flex: 1,
    paddingVertical: 0
  },
  greeting: {
    color: "#999",
    fontWeight: "bold"
  }
});
