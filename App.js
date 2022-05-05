import 'react-native-gesture-handler';
import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import { func } from './src/constants';
import NavigationContainer from './src/navigation/Stack';

export default function App() {


  const [currentSongData, setCurrentSongData] = useState({
        album: 'Swimming',
        artist: 'Mac Miller',
        image: 'swimming',
        length: 312,
        title: 'So It Goes'
      })
  const [toggleTabBar, setToggleTabBar] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  if (isLoading) {
      return (
        <AppLoading
          onError={() => {
            // console.warn
          }}
          onFinish={() => setIsLoading(false)}
          startAsync={func.loadAssetsAsync}
        />
      );
    }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <NavigationContainer screenProps={{
            currentSongData,
            changeSong: setCurrentSongData,
            toggleTabBarState: toggleTabBar,
            setToggleTabBar: setToggleTabBar
          }} />
    </>
    
  );
}

