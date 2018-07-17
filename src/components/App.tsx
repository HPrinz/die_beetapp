import React, {ReactNode} from "react";
import { connect } from "react-redux";
import { StatelessComponent } from "react";
import MainView from "./MainView";
import { RootState } from "../reducers";
import { ScrollView, View, StyleSheet } from "react-native";
import { NativeRouter, Route, Link, Redirect, withRouter } from 'react-router-native'
import Hello from "./setup/Hello";
import BedType from "./setup/BedType";
import BedAttributes from "./setup/BedAttributes";
import BedPosition from "./setup/BedPosition";
import Crops from "./setup/Crops";
import { Text } from "react-native-elements";
import Header from "./Header";

type OwnProps = {};

type StateToPropsType = {
  //Did the user the intro/setup of the app?
  isSetUp: boolean;
};

type DispatchToPropsType = {};

export type AppProps = OwnProps & StateToPropsType & DispatchToPropsType;

class App extends React.Component<AppProps> {

  constructor(props: StateToPropsType) {
    super(props);
  }

  render() {
    return <NativeRouter>
      <View style={styles.root}>
        <Header />
        <ScrollView>

          <Route path="/hello" component={Hello} exact />
          <Route path="/bedtype" component={BedType} exact />
          <Route path="/bedattributes" component={BedAttributes} exact />
          <Route path="/bedposition" component={BedPosition} exact />
          <Route path="/crops" component={Crops} exact />
          <Route path="/" component={MainView} exact />
          <Route path="/taskdetail" component={MainView} exact />
          
        </ScrollView>
      </View>
    </NativeRouter>
  }
}

const mapStateToProps = (state: RootState): StateToPropsType => ({
  isSetUp: state.garden.setupStep == 5
});

export { App as PureComponent };
export default connect(mapStateToProps)(App);

const styles = StyleSheet.create({
  root: {
    height: '100%'
  },
  scroll: {
    height: '100%'
  }
});
