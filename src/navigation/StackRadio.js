import React from "react";
import PropTypes from "prop-types";
import { createStackNavigator } from "react-navigation-stack";

// screens
import Radio from "../screens/radio/Radio";

// icons
import SvgTabRadio from "../components/icons/Svg.TabRadio";

const Icon = ({ focused }) => <SvgTabRadio active={focused} />;

Icon.propTypes = {
  // required
  focused: PropTypes.bool.isRequired,
};

export default createStackNavigator(
  {
    SearchMain: {
      screen: Radio,
    },
  },
  {
    headerMode: "none",
    navigationOptions: {
      tabBarLabel: "Radio",
      tabBarIcon: Icon,
    },
  }
);
