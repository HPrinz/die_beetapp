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

class BedPostion extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.root}>
        <Text>Gartenort:</Text>

        <Link to="/bedposition">
          <Text>Gartenort zeigen</Text>
        </Link>
      </View>
    );
  }
}
export { BedPostion as PureComponent };
export default withRouter(BedPostion);

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    alignSelf: "center"
  }
});