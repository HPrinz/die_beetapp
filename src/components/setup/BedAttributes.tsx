import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { RouteComponentProps, withRouter } from "react-router";
import { Link } from "react-router-native";
import { Slider, Input, Button, Card } from "react-native-elements";
import { SetOnboardingStepCompleted, SetBedSize, SetBedSun } from "../../actions";
import { connect } from "react-redux";
import { OtherActionResponse } from "../../actions/action.type";
import { Dispatch } from "../../../node_modules/redux";
import { Bed } from "../../reducers/garden";
import { RootState } from "../../reducers";

type OwnProps = {};

type StateToPropsType = {
  beds: { [bedId: string]: Bed };
};

interface DispatchToPropsType {
  setSetupStep: () => void;
  setBedSize: (bedId : string, size : string) => void;
  setBedSun: (bedId : string, sun : number) => void;
};

export type Props = RouteComponentProps<{}> &
  OwnProps &
  StateToPropsType &
  DispatchToPropsType;

type State = {
};

class BedAttributes extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <View>
        {Object.values(this.props.beds).map((bed: Bed) => (
          <Card title={bed.type + " #" + bed.id.substr(0, 2)}>

            <View style={styles.hor}>
              <Text style={{width: '50%'}} >Beetgrößen einstellen:</Text>
              <Input value={bed.size || ''} placeholder="3x3" onChangeText={(value) => this.props.setBedSize(bed.id, value)} />
            </View>
            
            <Text>Beetstandort einstellen:</Text>
            <View >
              <Slider
                value={bed.sunHours || 0}
                minimumValue={0}
                maximumValue={10}
                step={1}
                onValueChange={value => this.props.setBedSun(bed.id, value)}
              />
              <Text>Mindestens {bed.sunHours} Sonnenstunden</Text>
            </View>
          </Card>
        ))};
        <Link
          to="/bedposition"
          component={Button}
          title="Gartenort zeigen"
          onPress={() => this.props.setSetupStep()}
          disabled={Object.values(this.props.beds).filter(bed => !bed.size || !bed.sunHours).length > 0}
        />
      </View>
    );
  }
}

function mapStateToProps(state: RootState): StateToPropsType {
  return {
    beds: state.garden.setup.beds,
  }
}

function mapDispatchToProps(dispatch: Dispatch<OtherActionResponse>): DispatchToPropsType {
  return {
    setBedSize: (bedId : string, size : string) => dispatch(SetBedSize(bedId, size)),
    setBedSun: (bedId : string, sunHours : number) => dispatch(SetBedSun(bedId, sunHours)),
    setSetupStep: () => dispatch(SetOnboardingStepCompleted(3))
  }
};


export { BedAttributes as PureComponent };
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(BedAttributes)
);

const styles = StyleSheet.create({
  hor:{
    flex: 1,
    flexDirection: 'row'
  }
 
});
