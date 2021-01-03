
import React, { useState } from 'react';
import { StyleSheet, Platform, View, Modal } from 'react-native';
import Feed from './screens/Feed';
import Constants from 'expo-constants'

import Comments from './screens/Comments'
import CommentInput from './components/CommentInput'

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

    setCommentsForItem({commentsForItem: updated});
  }

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
