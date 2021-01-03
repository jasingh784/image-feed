
import React, { useState, useEffect } from 'react';
import { StyleSheet, Platform, View, Modal } from 'react-native';
import Feed from './screens/Feed';
import Constants from 'expo-constants'
import AsyncStorage from '@react-native-async-storage/async-storage';

import Comments from './screens/Comments'
import CommentInput from './components/CommentInput'

const ASYNC_STORAGE_COMMENTS_KEY = 'ASYN_STORAGE_COMMENTS_KEY';

export default function App() {

  const [commentsForItem, setCommentsForItem] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  openCommentScreen = id => {
    setShowModal(true);
    setSelectedItemId(id)
  }

  closeCommentScreen = () => {
    setShowModal(false);
    setSelectedItemId(null);
  }

  onSubmitComment = (text) => {
    const comments = commentsForItem[selectedItemId] || [];

    const updated = {
      ...commentsForItem,
      [selectedItemId]: [...comments, text],
    }

    setCommentsForItem(updated);

    try {
      AsyncStorage.setItem(ASYNC_STORAGE_COMMENTS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.log("Failed to save comment", text, 'for', selectedItemId);
    }
  }

  useEffect(() => {
    //create a scoped async function in the hook
    async function getCommentsFromStorage() {
        try {
            console.log('feteching comments from AsyncStorage')
            const commentsFromStorage = await AsyncStorage.getItem(
              ASYNC_STORAGE_COMMENTS_KEY,
            );

            setCommentsForItem( commentsFromStorage ? JSON.parse(commentsFromStorage) : {} )
            
        } catch (e) {
            console.log("Failed to load comments:" + e);
        }
        
    }

    //execute the created function directly
    getCommentsFromStorage();
    
}, [])


  return (
    <View style={styles.container}>
      <Feed 
        style={styles.feed}
        commentsForItem={commentsForItem}
        onPressComments={openCommentScreen}
      />
      <Modal
        visible={showModal}
        animationType='slide'
        onRequestClose={closeCommentScreen}
      >
        <Comments
          style={styles.comments}
          comments={commentsForItem[selectedItemId] || []}
          onClose={closeCommentScreen}
          onSubmitComment={onSubmitComment}
        />
      </Modal>
    </View>
  );
}

const platformVersion = 
    Platform.OS === 'ios' ? parseInt(Platform.Version, 10) : Platform.Version;

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    feed: {
        flex: 1,
        marginTop: 
            Platform.OS === 'android' || platformVersion < 11
                ? Constants.statusBarHeight
                : 0,
    },
    comments: {
      flex: 1,
      marginTop: 
            Platform.OS === 'android' || platformVersion < 11
                ? Constants.statusBarHeight
                : 0,
    },
})
