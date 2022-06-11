import * as React from "react";
import PropTypes from "prop-types";
import { createStackNavigator } from "react-navigation-stack";

// screens
import Library from "../screens/library/Library";
import Album from "../screens/album/Album";
import MySongs from "../screens/library/song/MySongs";
import Artist from "../screens/artist/Artist";
import LikedSongs from "../screens/library/song/LikedSongs";
import SavedSongs from "../screens/library/song/SavedSongs";
import SavedAlbums from "../screens/library/SavedAlbums";
import SavedArtists from "../screens/library/SavedArtists";
import Playlists from "../screens/library/playlist/Playlists";

// icons
import SvgTabLibrary from "../components/icons/Svg.TabLibrary";

const Icon = ({ focused }) => <SvgTabLibrary active={focused} />;

Icon.propTypes = {
  // required
  focused: PropTypes.bool.isRequired,
};

export default createStackNavigator(
  {
    LibraryMain: {
      screen: Library,
    },
    Album,
    Artist,
    SavedAlbums,
    SavedArtists,
    Playlists,
    LikedSongs,
    SavedSongs,
    MySongs,
  },
  {
    headerMode: "none",
    navigationOptions: {
      tabBarLabel: "Library",
      tabBarIcon: Icon,
    },
  }
);
