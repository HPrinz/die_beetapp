import React from "react";
import { View, StyleSheet, Text } from "react-native";

class Header extends React.Component {
  render() {
    return (
      <View style={styles.viewStyle}>
        <Text style={styles.heading}>die beetapp</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 35
  },
  viewStyle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    marginTop: 40
  }
});

export { Header as PureComponent };
export default Header;
