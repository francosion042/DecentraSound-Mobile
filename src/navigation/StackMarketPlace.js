import React from "react";
import PropTypes from "prop-types";
import { createStackNavigator } from "react-navigation-stack";

// screens
import MarketPlace from "../screens/marketPlace/MarketPlace";

// icons
import SvgTabMarketPlace from "../components/icons/Svg.TabMarketPlace";

const Icon = ({ focused }) => <SvgTabMarketPlace active={focused} />;

Icon.propTypes = {
  // required
  focused: PropTypes.bool.isRequired,
};

export default createStackNavigator(
  {
    SearchMain: {
      screen: MarketPlace,
    },
  },
  {
    headerMode: "none",
    navigationOptions: {
      tabBarLabel: "MarketPlace",
      tabBarIcon: Icon,
    },
  }
);
