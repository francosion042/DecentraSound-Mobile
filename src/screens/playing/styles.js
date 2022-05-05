import { StyleSheet, Dimensions } from "react-native";

const Dev_Height = Dimensions.get("window").height;
const Dev_Width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  contanier: {
    height: Dev_Height,
    width: Dev_Width
  },
  mainbar: {
    height: "10%",
    width: "100%",
    flexDirection: "row",
    alignItems: "center"
  },
  now_playing_text: {
    fontSize: 19,
    marginLeft: "24%"
  },
  music_logo_view: {
    height: "30%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  image_view: {
    height: "100%",
    width: "50%",
    borderRadius: 10
  },
  name_of_song_View: {
    height: "15%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  name_of_song_Text1: {
    fontSize: 19,
    fontWeight: "500"
  },
  name_of_song_Text2: {
    color: "#808080",
    marginTop: "4%"
  },
  slider_view: {
    height: "10%",
    width: "100%",
    alignItems: "center",
    flexDirection: "row"
  },
  slider_style: {
    height: "70%",
    width: "60%"
  },
  slider_time: {
    fontSize: 15,
    marginLeft: "6%",
    color: "#808080"
  },
  functions_view: {
    flexDirection: "row",
    height: "10%",
    width: "100%",
    alignItems: "center"
  },
  recently_played_view: {
    height: "25%",
    width: "100%"
  },
  recently_played_text: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#808080",
    marginLeft: "5%",
    marginTop: "6%"
  },
  recently_played_list: {
    backgroundColor: "#FFE3E3",
    height: "50%",
    width: "90%",
    borderRadius: 10,
    marginLeft: "5%",
    marginTop: "5%",
    alignItems: "center",
    flexDirection: "row"
  },
  recently_played_image: {
    height: "80%",
    width: "20%",
    borderRadius: 10
  },
  recently_played_list_text: {
    height: "100%",
    width: "60%",
    justifyContent: "center"
  },
  recently_played_list_text1: {
    fontSize: 15,
    marginLeft: "8%"
  },
  recently_played_list_text2: {
    fontSize: 16,
    color: "#808080",
    marginLeft: "8%"
  }
});

export default styles;
