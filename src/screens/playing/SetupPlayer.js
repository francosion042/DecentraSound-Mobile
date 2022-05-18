import TrackPlayer, { Capability, RepeatMode } from "react-native-track-player";

// Creates the player
const SetupPlayer = async (songs, repeat) => {
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
      artwork: song.imageUrl
        ? song.imageUrl
        : require("../../../assets/icon.png"),
    };
    return track;
  });

  await TrackPlayer.add(tracks);

  if (repeat === "Off") {
    TrackPlayer.setRepeatMode(RepeatMode.Off);
  }
  if (repeat === "Track") {
    TrackPlayer.setRepeatMode(RepeatMode.Track);
  }
  if (repeat === "Queue") {
    TrackPlayer.setRepeatMode(RepeatMode.Queue);
  }
};

export default SetupPlayer;
