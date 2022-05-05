import "react-native-gesture-handler";
import React, { Component, Fragment } from "react";
import { StatusBar } from "expo-status-bar";
import NavigationContainer from "./src/navigation/Stack";

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentSongData: {
        album: "Swimming",
        artist: "Mac Miller",
        image: "swimming",
        length: 312,
        title: "So It Goes"
      },
      isLoading: true,
      toggleTabBar: false
    };

    this.setCurrentSongData = this.setCurrentSongData.bind(this);
    this.setToggleTabBar = this.setToggleTabBar.bind(this);
  }

  setToggleTabBar() {
    this.setState(({ toggleTabBar }) => ({
      toggleTabBar: !toggleTabBar
    }));
  }

  setCurrentSongData(data) {
    this.setState({
      currentSongData: data
    });
  }

  render() {
    const { currentSongData, toggleTabBar } = this.state;

    return (
      <Fragment>
        <StatusBar barStyle="light-content" />
        <NavigationContainer
          screenProps={{
            currentSongData,
            changeSong: this.setCurrentSongData,
            toggleTabBarState: toggleTabBar,
            setToggleTabBar: this.setToggleTabBar
          }}
        />
      </Fragment>
    );
  }
}

export default App;
