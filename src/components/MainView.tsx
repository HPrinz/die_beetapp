import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { loadTasks } from "../actions";

import AsqHeader from "./AsqHeader.js";

type StateToPropsType = { loadQuestions?: Function };

type DispatchToPropsType = {};

export type MainProps = StateToPropsType & DispatchToPropsType;

type MainState = {};

export class MainView extends React.Component<MainProps, MainState> {
  public props: MainProps;

  constructor(props: MainProps) {
    super(props);
    this.props = props;
    this.state = {};
  }

  fetchQuestions = () => {
    this.props.loadQuestions();
  };

  onAsqSelected = () => {
    this.fetchQuestions();
  };

  componentDidMount() {
    return this.fetchQuestions();
  }

  render() {
    return (
      <View style={styles.parent}>
        <View style={styles.asqcontainer}>
          <TouchableOpacity
            onPress={this.onAsqSelected}
            style={styles.touchableStyles}
          >
            <Text
              style={{
                color: "#841584",
                fontSize: 22,
                textAlign: "center",
                fontWeight: "600"
              }}
            >
              GartenApp
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={{ flex: 2, flexGrow: 2 }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parent: {
    flex: 1
  },

  asqcontainer: {
    padding: 10,
    flex: 1,
    backgroundColor: "#ffffff"
  },

  headercontainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },

  note: {
    padding: 10,
    fontSize: 12
  },

  qbox: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#CCCCCC"
  },

  touchableStyles: {
    marginTop: 0,
    backgroundColor: "white",
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 5
  },
  icon: {
    width: 26,
    height: 26
  }
});

const mapDispatchToProps: DispatchToPropsType = {};

export { MainView as PureComponent };
export default connect(null, mapDispatchToProps)(MainView);
