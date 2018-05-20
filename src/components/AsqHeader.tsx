import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
//import { Font } from 'expo';

class AsqHeader extends Component {
  state = {
    fontLoaded: false
  };

  render() {
    return (
      <View style={styles.viewStyle}>
        {<Text style={styles.asq}>ASQ*</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  asqlato: {
    fontSize: 35,
    fontFamily: "Lato-black"
  },
  asq: {
    fontSize: 35,
    fontWeight: "900"
  },
  viewStyle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center"
  }
});
export default AsqHeader;
