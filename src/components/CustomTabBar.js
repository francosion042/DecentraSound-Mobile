import React, { useContext } from "react";
import PropTypes from "prop-types";
import { BottomTabBar } from "react-navigation-tabs";
import { ScreenContext, PlayingContext } from "../contexts";
import ModalSongOptions from "./ModalSongOptions";

// components
import BarMusicPlayer from "./BarMusicPlayer";

const CustomTabBar = (props) => {
  const { showTabBarState, songOptionsModalVisible } =
    useContext(ScreenContext);
  const { currentSongData } = useContext(PlayingContext);

  return !showTabBarState ? null : (
    <React.Fragment>
      {songOptionsModalVisible && (
        <ModalSongOptions navigation={props.navigation} />
      )}
      {currentSongData ? <BarMusicPlayer /> : null}
      <BottomTabBar {...props} />
    </React.Fragment>
  );
};

CustomTabBar.propTypes = {
  // required
  navigation: PropTypes.object.isRequired,
};

export default CustomTabBar;
