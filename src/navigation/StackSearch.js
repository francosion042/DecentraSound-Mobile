import React from "react";
import PropTypes from "prop-types";
import { createStackNavigator } from "react-navigation-stack";

// screens
import SearchScreen from "../screens/search/Search";
import Searching from "../screens/search/Searching";
import Album from "../screens/album/Album";
import Artist from "../screens/artist/Artist";
import Albums from "../screens/album/Albums";

// icons
import SvgTabSearch from "../components/icons/Svg.TabSearch";

const Icon = ({ focused }) => <SvgTabSearch active={focused} />;

Icon.propTypes = {
  // required
  focused: PropTypes.bool.isRequired,
};

export default createStackNavigator(
  {
    SearchMain: {
      screen: SearchScreen,
    },
    Searching,
    Album,
    Albums,
    Artist,
  },
  {
    headerMode: "none",
    initialRouteName: "SearchMain",
    navigationOptions: {
      tabBarLabel: "Search",
      tabBarIcon: Icon,
    },
  }
);
