import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  Text, 
  View
 } from 'react-native';
 import NavigationContainer from './src/navigation/Stack';

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <NavigationContainer />
    </>
    
  );
}

