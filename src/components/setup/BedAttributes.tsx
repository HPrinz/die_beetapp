import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RouteComponentProps, withRouter } from "react-router";
import { Link } from "react-router-native";
import { Slider, Input, Button } from "react-native-elements";
import { RootState } from "../../reducers";
import { SetOnboardingStepCompleted } from "../../actions";
import { connect } from "react-redux";

type OwnProps = {};

type StateToPropsType = {};

type DispatchToPropsType = {
  setSteupStep : SetOnboardingStepCompleted
};

export type Props = RouteComponentProps<{}> &
  OwnProps &
  StateToPropsType &
  DispatchToPropsType;

type State = {
  sunstate : number;
};

class BedAttributes extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      sunstate : 3
    }
  }

  render() {
    return (
      <View style={styles.root}>
        <View style={styles.content}>
          <Text>Beetgrößen einstellen:</Text>

          <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
            <Input placeholder='3x3m'/>
          </View>

          <Text>Beetstandort einstellen:</Text>
          <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
            <Slider
              value={this.state.sunstate}
              minimumValue={0}
              maximumValue={10}
              step={1}
              onValueChange={(value) => this.setState({sunstate: value})} />
            <Text>Mindestens {this.state.sunstate} Sonnenstunden</Text>
          </View>
        </View>

        <Link to="/bedposition" component={Button} title='Gartenort zeigen' onPress={() => this.props.setSteupStep} />
      </View>
    );
  }
}

const mapDispatchToProps: DispatchToPropsType = {
  setSteupStep: SetOnboardingStepCompleted(5)
};


export { BedAttributes as PureComponent };
export default withRouter(connect(null, mapDispatchToProps)(BedAttributes));

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    alignSelf: "center",
    flex: 1
  },
  content: {
    flexGrow: 1,
    justifyContent: 'space-around'
  }
});
