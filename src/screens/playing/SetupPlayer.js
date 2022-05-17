import TrackPlayer, { Capability } from "react-native-track-player";

// Creates the player
const SetupPlayer = async (songs) => {
  await TrackPlayer.setupPlayer();

  TrackPlayer.updateOptions({
    // Media controls capabilities
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
    ],

    // Capabilities that will show up when the notification is in the compact form on Android
    compactCapabilities: [Capability.Play, Capability.Pause],
  });

  const tracks = songs.map((song) => {
    const track = {
      url: song.audioUrl,
      title: song.title,
      artist: "Track Artist",
      artwork: song.imageurl
        ? song.imageurl
        : require("../../../assets/icon.png"),
    };
    return track;
  });

  console.log(tracks);

  await TrackPlayer.add(tracks);

  //   TrackPlayer.setRepeatMode(RepeatMode.Queue);
};

export default SetupPlayer;
