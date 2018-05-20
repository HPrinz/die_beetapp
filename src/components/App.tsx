import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { connect } from "react-redux";
import { StatelessComponent } from "react";
import Hello from "./Hello";
import MainView from "./MainView";
import { RootState } from "../reducers";
import { ScrollView } from "react-native";

type OwnProps = RouteComponentProps<{}>;

type StateToPropsType = {
  isSetUp: boolean;
};

type DispatchToPropsType = {};

export type AppProps = OwnProps & StateToPropsType & DispatchToPropsType;

const App: StatelessComponent<AppProps> = ({ isSetUp }: AppProps) => (
  // show MainView if intro setup is finished, else go to hello
  <ScrollView>{isSetUp ? <MainView /> : <Hello />}</ScrollView>
);

const mapStateToProps = (state: RootState): StateToPropsType => ({
  isSetUp: state.garden.setupStep == 5
});

export { App as PureComponent };
export default withRouter(connect(mapStateToProps)(App));
