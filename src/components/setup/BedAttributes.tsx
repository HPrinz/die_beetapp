import React from "react";
import { StyleSheet, Text, View} from "react-native";
import { RouteComponentProps, withRouter, Link } from "react-router-native";
import { Slider, Input, Button, Card } from "react-native-elements";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { setBedSize, setBedSun, setOnboardingStepCompleted, setBedSetUp, setBedName, OtherActionResponse } from "../../actions";
import { Bed, bedTypes } from "../../reducers/garden";
import { RootState } from "../../reducers";

type OwnProps = {};

type StateToPropsType = {
  bed: Bed;
};

interface DispatchToPropsType {
  setSetupStep: () => void;
  setBedSize: (bedId : string, size : number) => void;
  setBedSun: (bedId : string, sun : number) => void;
  setBedName: (bedId : string, name : string) => void;
  onBack: (bedId : string) => void;
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
    const {bed} = this.props;
    return (
      <View>
          <Card title={bedTypes[bed.typeId].name + ' | ' + bed.name}  key={bed.id}>

            <View style={styles.hor}>
              <Text style={{width: '50%'}} >Beetname:</Text>
              <Input style={{width: '50%'}} placeholder={bedTypes[bed.typeId].name + " " + 1} onChangeText={(value) => this.props.setBedName(bed.id, value)}>{bed.name}</Input>
            </View>

            <View style={styles.hor}>
              <Text style={{width: '50%'}} >Beetgröße im m2:</Text>
              <Input style={{width: '50%'}} keyboardType="numeric" placeholder="3" onChangeText={(value) => this.props.setBedSize(bed.id, +value)} >{bed.size}</Input>
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

           <Link
          to="/bedtype"
          component={Button}
          title="zurück"
          onPress={() => this.props.onBack(bed.id)}
        />

      </View>
    );
  }
}

function mapStateToProps(state: RootState): StateToPropsType {
  return {
    bed: state.garden.setup.beds.find(element => element.id === state.garden.selectedBedId) as Bed
  }
}

function mapDispatchToProps(dispatch: Dispatch<OtherActionResponse>): DispatchToPropsType {
  return {
    setBedSize: (bedId : string, size : number) => dispatch(setBedSize(bedId, size)),
    setBedSun: (bedId : string, sunHours : number) => dispatch(setBedSun(bedId, sunHours)),
    setBedName: (bedId : string, name : string) => dispatch(setBedName(bedId, name)),
    setSetupStep: () => dispatch(setOnboardingStepCompleted(4)),
    onBack: (bedId: string) => dispatch(setBedSetUp(bedId))
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
