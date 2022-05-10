import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

// navigation
import TabNavigation from "./TabNavigation";

// screens
import ModalMusicPlayer from "../screens/playing/ModalMusicPlayer";
import ModalMoreOptions from "../screens/utils/ModalMoreOptions";
import ModalAccountOptions from "../screens/account/ModalAccountOptions";

const StackNavigator = createStackNavigator(
  {
    // Main Tab Navigation
    // /////////////////////////////////////////////////////////////////////////
    TabNavigation,

    // Modals
    // /////////////////////////////////////////////////////////////////////////
    ModalMusicPlayer,
    ModalMoreOptions: {
      screen: ModalMoreOptions,
      navigationOptions: {
        cardStyle: { backgroundColor: "transparent" },
      },
    },
    ModalAccountOptions: {
      screen: ModalAccountOptions,
      navigationOptions: {
        cardStyle: { backgroundColor: "transparent" },
      },
    },
  },
  {
    headerMode: "none",
    initialRouteName: "TabNavigation",
    mode: "modal",
  }
);

const NavigationContainer = createAppContainer(StackNavigator);

export default NavigationContainer;
