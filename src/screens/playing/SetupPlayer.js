import TrackPlayer, { RepeatMode } from "react-native-track-player";

// Creates the player
const SetupPlayer = async (songs) => {
  await TrackPlayer.setupPlayer();

  for (const song of songs) {
    await TrackPlayer.add({
      url: song.audioUrl,
      title: song.title,
      artist: "Track Artist",
      artwork: song.imageurl
        ? song.imageurl
        : require("../../../assets/icon.png"),
    });
  }

  //   TrackPlayer.setRepeatMode(RepeatMode.Queue);
};

export default SetupPlayer;
