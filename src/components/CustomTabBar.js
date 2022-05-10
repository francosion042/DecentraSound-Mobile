import React, { useContext } from "react";
import PropTypes from "prop-types";
import { BottomTabBar } from "react-navigation-tabs";
import { ScreenContext } from "../contexts";

// components
import BarMusicPlayer from "./BarMusicPlayer";

const CustomTabBar = (props) => {
  const { currentSongData, showTabBarState } = useContext(ScreenContext);

  return !showTabBarState ? null : (
    <React.Fragment>
      {currentSongData ? <BarMusicPlayer song={currentSongData} /> : null}
      <BottomTabBar {...props} />
    </React.Fragment>
  );
};

CustomTabBar.propTypes = {
  // required
  navigation: PropTypes.object.isRequired,
};

export default CustomTabBar;
