import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Hello } from "./src/components/Hello";
import MainView from "./src/components/MainView";

export default class App extends React.Component {
  fetchQuestions = (name: string) => {
    return "TASK";
  };

  render() {
    return (
      <View style={styles.container}>
        <Hello name="Kai" enthusiasmLevel={3}>
          {" "}
        </Hello>

        <MainView loadQuestions={this.fetchQuestions} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
