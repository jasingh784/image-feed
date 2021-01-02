import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AuthorRow from './components/AuthorRow';
import Constants from 'expo-constants'

export default function App() {
  return (
    <View style={styles.container}>
      <AuthorRow 
        fullname={'First Last'}
        linkText={'Comments'}
        onPressLinkText={() => {
          console.log('Pressed link!');
        }}  
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
