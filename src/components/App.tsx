import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { connect } from "react-redux";
import { StatelessComponent } from "react";
import MainView from "./MainView";
import { RootState } from "../reducers";
import { ScrollView, View } from "react-native";
import Setup from "./setup/Setup";

type OwnProps = RouteComponentProps<{}>;

type StateToPropsType = {
  //Did the user the intro/setup of the app?
  isSetUp: boolean;
};

type DispatchToPropsType = {};

export type AppProps = OwnProps & StateToPropsType & DispatchToPropsType;

const App: StatelessComponent<AppProps> = ({ isSetUp }: AppProps) => (
  // show MainView if intro setup is finished, else go to hello
  <View>{isSetUp ? <MainView /> : <Setup />}</View>
);

const mapStateToProps = (state: RootState): StateToPropsType => ({
  isSetUp: state.garden.setupStep == 5
});

export { App as PureComponent };
export default withRouter(connect(mapStateToProps)(App));