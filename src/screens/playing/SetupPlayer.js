import TrackPlayer from "react-native-track-player";

// Creates the player
const SetupPlayer = async (songs) => {
  await TrackPlayer.setupPlayer();

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
