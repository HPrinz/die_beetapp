import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { RouteComponentProps, withRouter } from "react-router";
import { Link } from "react-router-native";

type OwnProps = {};

type StateToPropsType = {};

type DispatchToPropsType = {};

export type Props = RouteComponentProps<{}> &
  OwnProps &
  StateToPropsType &
  DispatchToPropsType;

type State = {};

class BedType extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.root}>
        <Text>Beetarten auswählen:</Text>

        <Link to="/bedsizes">
          <Text>Beetgrößen einstellen</Text>
        </Link>
      </View>
    );
  }
}
export { BedType as PureComponent };
export default withRouter(BedType);

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    alignSelf: "center"
  }
});
