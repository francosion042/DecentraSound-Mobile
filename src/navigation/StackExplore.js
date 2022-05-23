import React from "react";
import PropTypes from "prop-types";
import { createStackNavigator } from "react-navigation-stack";

// screens
import Explore from "../screens/explore/Explore";

// icons
import SvgTabExplore from "../components/icons/Svg.TabExplore";

const Icon = ({ focused }) => <SvgTabExplore active={focused} />;

Icon.propTypes = {
  // required
  focused: PropTypes.bool.isRequired,
};

export default createStackNavigator(
  {
    ExploreMain: {
      screen: Explore,
    },
  },
  {
    headerMode: "none",
    navigationOptions: {
      tabBarLabel: "Explore",
      tabBarIcon: Icon,
    },
  }
);
