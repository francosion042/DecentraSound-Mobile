import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { colors } from "../constants";

// navigation stacks
import StackHome from "./StackHome";
import StackSearch from "./StackSearch";
import StackLibrary from "./StackLibrary";
import StackMarketPlace from "./StackMarketPlace";

// components
import CustomTabBar from "../components/CustomTabBar";

const BottomTabNavigator = createBottomTabNavigator(
  {
    StackHome,
    StackMarketPlace,
    StackSearch,
    StackLibrary
  },
  {
    initialRouteName: "StackHome",
    tabBarComponent: props => <CustomTabBar {...props} />,
    tabBarOptions: {
      activeTintColor: colors.white,
      inactiveTintColor: colors.greyInactive,
      style: {
        backgroundColor: colors.grey,
        borderTopWidth: 0
      }
    }
  }
);

export default BottomTabNavigator;
