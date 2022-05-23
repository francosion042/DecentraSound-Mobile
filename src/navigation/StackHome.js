import React from "react";
import PropTypes from "prop-types";
import { createStackNavigator } from "react-navigation-stack";

// screens
import Home from "../screens/home/Home";
import Album from "../screens/album/Album";
import Artist from "../screens/artist/Artist";

// icons
import SvgTabHome from "../components/icons/Svg.TabHome";

const Icon = ({ focused }) => <SvgTabHome active={focused} />;

Icon.propTypes = {
  // required
  focused: PropTypes.bool.isRequired,
};

export default createStackNavigator(
  {
    Home,
    Album,
    Artist,
  },
  {
    headerMode: "none",
    initialRouteName: "Home",
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarIcon: Icon,
    },
  }
);
