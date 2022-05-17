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
    ModalMusicPlayer: {
      screen: ModalMusicPlayer,
      navigationOptions: {
        cardStyleInterpolator: ({ current: { progress } }) => ({
          cardStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          },
          overlayStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.5],
              extrapolate: "clamp",
            }),
          },
        }),
      },
    },
    ModalMoreOptions: {
      screen: ModalMoreOptions,
      navigationOptions: {
        cardStyle: { backgroundColor: "transparent" },
        cardStyleInterpolator: ({ current: { progress } }) => ({
          cardStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          },
          overlayStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.5],
              extrapolate: "clamp",
            }),
          },
        }),
      },
    },
    ModalAccountOptions: {
      screen: ModalAccountOptions,
      navigationOptions: {
        cardStyle: { backgroundColor: "transparent" },
        cardStyleInterpolator: ({ current: { progress } }) => ({
          cardStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          },
          overlayStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.5],
              extrapolate: "clamp",
            }),
          },
        }),
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
