import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RouteComponentProps, withRouter } from "react-router";
import { Link } from "react-router-native";
import { Button } from "react-native-elements";

type OwnProps = {};

type StateToPropsType = {};

type DispatchToPropsType = {};

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
        <Link to="/hello" component={Button} title='Fertig!'/>
      </View>
    );
  }
}
export { Crops as PureComponent };
export default withRouter(Crops);

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    alignSelf: "center",
    flex: 1,
  }
});
