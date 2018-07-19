import React from "react";
import { StyleSheet, View} from "react-native";
import { RouteComponentProps, withRouter, Link } from "react-router-native";
import { Slider, Input, Button, Card, Text, Divider } from "react-native-elements";
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

function getSunAsName(sunHours: number) : string{
  if(sunHours < 3){
    return 'schattig';
   }
   if(sunHours > 5){
     return  'sonnig';
    }
    return 'halbschattig'
}

class BedAttributes extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

 

  render() {
    const {bed} = this.props;
    return (
      <View>
          <Card title={bedTypes[bed.typeId].name + ' | ' + bed.name}  key={bed.id}>

            {/* <View style={styles.hor}> */}
              <Text style={{fontSize: 16, color: '#0C6E5D'}}>Beetname:</Text>
              <Input placeholder={bedTypes[bed.typeId].name + " " + 1} onChangeText={(value) => this.props.setBedName(bed.id, value)}>{bed.name}</Input>
            {/* </View> */}

            {/* <View style={styles.hor}> */}
              <Text style={{marginTop: 15, fontSize: 16, color: '#0C6E5D'}}>Beetgröße im m2:</Text>
              <Input keyboardType="numeric" placeholder="3" onChangeText={(value) => this.props.setBedSize(bed.id, +value)} >{bed.size}</Input>
            {/* </View> */}
            
            <Text style={{marginTop: 15, fontSize: 16, color: '#0C6E5D'}}>Beetstandort einstellen:</Text>
            <View >
              <Slider
                value={bed.sunHours || 4}
                minimumValue={0}
                maximumValue={10}
                step={1}
                thumbTintColor='#0C6E5D'
                onValueChange={value => this.props.setBedSun(bed.id, value)}
                style={{width: '80%', flex: 1, alignSelf: 'center'}}
              />
              <Text style={{textAlign: 'center'}}>{bed.sunHours} Sonnenstunden - {getSunAsName(bed.sunHours || 4)}}</Text>
            </View>
          </Card>

           <Link
          to="/bedtype"
          component={Button}
          title="fertig"
          onPress={() => this.props.onBack(bed.id)}
          style={{margin: 10}}
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
    flexDirection: 'row',
    alignItems: 'center'
  }
 
});
