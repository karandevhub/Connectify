import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  StyleSheet,
} from 'react-native';

const CommentComponent = () => {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const toggleCommentBox = () => {
    setShowCommentBox(!showCommentBox);
  };

  const addComment = () => {
    if (newComment.trim() !== '') {
      setComments([...comments, { id: comments.length, text: newComment }]);
      setNewComment('');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleCommentBox}>
        <Text>Comment</Text>
      </TouchableOpacity>

      <Modal
        visible={showCommentBox}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleCommentBox}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={toggleCommentBox}>
            <Text>Close</Text>
          </TouchableOpacity>
          <TextInput
            placeholder="Type your comment here"
            value={newComment}
            onChangeText={(text) => setNewComment(text)}
          />
          <TouchableOpacity onPress={addComment}>
            <Text>Post</Text>
          </TouchableOpacity>

          <FlatList
            data={comments}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.commentItem}>
                <Text>{item.text}</Text>
              </View>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 50,
    padding: 20,
    borderRadius: 10,
  },
  commentItem: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    paddingVertical: 10,
  },
});

export default CommentComponent;
