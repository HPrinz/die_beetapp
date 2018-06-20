import WelcomeScreen from "../components/MainView";
import { StackNavigator } from "react-navigation";

const Navigator = StackNavigator({
  welcome: {
    screen: WelcomeScreen
  }
});

export default Navigator;
