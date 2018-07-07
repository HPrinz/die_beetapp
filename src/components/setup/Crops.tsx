import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { RouteComponentProps, withRouter } from "react-router";
import { Link } from "react-router-native";
import { Button, Card, ListItem, CheckBox } from "react-native-elements";

type OwnProps = {};

type StateToPropsType = {};

type DispatchToPropsType = {};

type State = {
  CultureList: Culture[];
};

export type Props = RouteComponentProps<{}> &
  OwnProps &
  StateToPropsType &
  DispatchToPropsType & State;

class Culture {
  Name: string;
  ImageUrl: string;
  Checked: boolean;

  constructor(pName: string, pImageUrl: string, pChecked: boolean) {
    this.Name = pName;
    this.ImageUrl = pImageUrl;
    this.Checked = pChecked;
  }
}

class Crops extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      CultureList: [
        new Culture("Tomate", "", false),
        new Culture("Salat", "", true),
      ]
    }
  }

  render() {
    return (
      <View style={styles.root}>

        <Card title="Kulturen auswählen">
          {
            this.state.CultureList.map((u, i) => {
              return (
                <CheckBox
                  key={u.Name}
                  title={u.Name}
                  checked={u.Checked}
                  onPress={() => u.Checked = !u.Checked}
                />
              );
            })
          }
        </Card>
        <Link to="/hello" component={Button} title='Fertig!' />
      </View>
    );
  }
}
export { Crops as PureComponent };
export default withRouter(Crops);

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    alignSelf: "center",
    flex: 1,
  }
});
