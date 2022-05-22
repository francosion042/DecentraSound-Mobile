import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { colors } from "../constants";

// navigation stacks
import StackHome from "./StackHome";
import StackSearch from "./StackSearch";
import StackLibrary from "./StackLibrary";
import StackExplore from "./StackExplore";
import StackRadio from "./StackRadio";

// components
import CustomTabBar from "../components/CustomTabBar";

const BottomTabNavigator = createBottomTabNavigator(
  {
    StackHome,
    StackExplore,
    StackRadio,
    StackSearch,
    StackLibrary,
  },
  {
    initialRouteName: "StackHome",
    tabBarComponent: (props) => <CustomTabBar {...props} />,
    tabBarOptions: {
      activeTintColor: colors.brandPrimary,
      inactiveTintColor: colors.greyInactive,
      style: {
        backgroundColor: colors.black,
        borderTopWidth: 0,
        height: 60,
      },
      labelStyle: {
        fontSize: 15,
      },
    },
  }
);

export default BottomTabNavigator;
