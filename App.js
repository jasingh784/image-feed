import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Card from './components/Card';
import Constants from 'expo-constants'

export default function App() {
  return (
    <View style={styles.container}>
      <Card 
        fullname={'First Last'}
        linkText={'Comments'}
        onPressLinkText={() => {
          console.log('Pressed link!');
        }}
        image={{uri: 'https://unsplash.it/600/600'}}  
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#fff',
  },
});
