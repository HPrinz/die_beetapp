import React from "react";
import { StyleSheet, Text, Image, Share, ShareContent, ShareOptions, View} from "react-native";
import { Card, Button } from "react-native-elements";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RouteComponentProps, withRouter, Link } from "react-router-native";

import { RootState } from "../../reducers";
import { Bed, Task, cropTypes, Crop } from "../../reducers/garden";
import { selectTask, OtherActionResponse, setBedForTask, markTaskResolved } from "../../actions";
import { taskTypes, TaskType } from "../../data/tasks";
import { bedTypes } from "../../data/bedTypes";

type OwnProps = {};

type StateToPropsType = {
  task: Task;
  selectedId: string | undefined;
  beds: Bed[];
};

type DispatchToPropsType = {
  onBack: () => void;
  setBedForTask: (taskId : string, bedId: string) => void;
  onMarkTaskResolved: (taskId : string) => void;
};

type State = {
  bed : Bed | undefined,
  crop : Crop | undefined,
  taskType: TaskType;
};

export type Props = RouteComponentProps<{}> &
  OwnProps &
  StateToPropsType &
  DispatchToPropsType &
  State;

class TaskDetailItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const { task} = this.props;
    this.state = {
      bed : task.bedId && this.props.beds.find(bed => bed.id === task.bedId) ? (this.props.beds.find(bed => bed.id === task.bedId) as Bed) : undefined,
      crop : task.cropId && cropTypes.find(crop => crop.id === (task.cropId as string)) ? (cropTypes.find(crop => crop.id === (task.cropId as string)) as Crop) : undefined,
      taskType: taskTypes[task.taskType]
    };
    this._shareTask = this._shareTask.bind(this);
  }

  private _shareTask(){
    const { taskType, bed, crop } = this.state;
    const bedText = !bed ? '' : ' im ' + bed.name;   
    const cropText = !crop ? '' : ' bei den ' + crop.name + 'n';   
    const shareContent = {
      message: 'Kannst du vielleicht das ' + taskType.name + bedText + cropText + ' übernehmen?',
      // url: 'http://beetapp.de',
      title: 'die beetapp Aufgabe teilen'
    } as ShareContent
    const shareOpts = {
      // Android only:
      dialogTitle: 'die beetapp',} as ShareOptions
    Share.share(shareContent, shareOpts);
  }

  render() {
    const { task} = this.props;
    const { taskType, bed, crop } = this.state;
    return (
      <Card 
        title={taskTypes[task.taskType].name + (taskTypes[task.taskType].id === 'giessen' && task.amount ? ' (' + Math.round(task.amount) + ' liter)': '')} 
        image={taskType.icon} 
        imageStyle={{height: 20, width: 20, alignSelf: 'center'}} 
        wrapperStyle={{alignItems: 'center', flex: 1}}
        containerStyle={{flex: 1}}>
        { (bed || crop ) && <Text>{(bed ? bedTypes[bed.typeId].name  + ': ' + bed.name : '') + (crop ? 'Kultur: ' + crop.name : '') }</Text> }
        <Image style={{flex: 1, width: 250, height: 200}} source={taskType.image} resizeMode="contain" />
        <Text>{taskType.description}</Text>
        <View style={{flex: 1, flexDirection: 'row', marginTop: 10, marginBottom: 20, justifyContent: "space-between"}}>
          <Link to="/" component={Button} onPress={() => this.props.onBack()} title='zurück'  style={{margin: 10}}/>
          <Button onPress={() => this._shareTask()} title='teilen' style={{margin: 10}}></Button>
          <Link to="/" component={Button} title='erledigt' style={{margin: 10}} onPress={() => {
            this.props.onMarkTaskResolved(task.id);
            this.props.onBack();
            }}/>
        
        </View>
      </Card>
    );
  }
}

function mapStateToProps(state: RootState): StateToPropsType {
  return {
    beds: state.garden.setup.beds,
    task: state.garden.tasks.find( x => x.id === state.garden.selectedTaskId) as Task,
    selectedId: state.garden.selectedTaskId,
  };
}

function mapDispatchToProps(
  dispatch: Dispatch<OtherActionResponse>
): DispatchToPropsType {
  return {
    onBack: () => dispatch(selectTask(undefined)),
    setBedForTask: (taskId : string, bedId: string) => dispatch(setBedForTask(taskId, bedId)),
    onMarkTaskResolved: (taskId : string) => dispatch(markTaskResolved(taskId)),
  };
}

export { TaskDetailItem as PureComponent };
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TaskDetailItem)
);

