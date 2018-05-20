import WelcomeScreen from "../components/WelcomeScreen";
import { StackNavigator } from "react-navigation";

const Navigator = StackNavigator({
  welcome: {
    screen: WelcomeScreen
  }
});

export default Navigator;
