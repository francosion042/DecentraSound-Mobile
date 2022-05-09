import React, { useContext } from "react";
import PropTypes from "prop-types";
import { BottomTabBar } from "react-navigation-tabs";
import { ScreenContext } from "../contexts";

// components
import BarMusicPlayer from "./BarMusicPlayer";

const CustomTabBar = (props) => {
  const { currentSongData, tabBarState } = useContext(ScreenContext);

  return tabBarState ? null : (
    <React.Fragment>
      <BarMusicPlayer song={currentSongData} />
      <BottomTabBar {...props} />
    </React.Fragment>
  );
};

CustomTabBar.propTypes = {
  // required
  navigation: PropTypes.object.isRequired,
};

export default CustomTabBar;
