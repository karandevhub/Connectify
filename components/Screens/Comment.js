import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../config";

const CommentComponent = ({ postId, postdata, updateComents }) => {
  const { userToken } = useContext(AuthContext);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const toggleCommentBox = () => {
    setShowCommentBox(!showCommentBox);
  };

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - date.getTime();
    const millisecondsInDay = 24 * 60 * 60 * 1000;

    const daysAgo = Math.floor(timeDifference / millisecondsInDay);

    if (daysAgo === 1) {
      return "1 day ago";
    } else if (daysAgo > 1) {
      return `${daysAgo} days ago`;
    } else {
      const minutesAgo = Math.floor(timeDifference / (60 * 1000));
      if (minutesAgo < 60) {
        return `${minutesAgo} minutes ago`;
      } else {
        const hoursAgo = Math.floor(timeDifference / (60 * 60 * 1000));
        return `${hoursAgo} hours ago`;
      }
    }
  };
  const FormattedDate = ({ date }) => {
    const formattedDate = formatDate(date);
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 5,
        }}
      >
        <Text style={{ fontSize: 13, color: "gray" }}>{formattedDate}</Text>
      </View>
    );
  };

  const apiAuth = {
    headers: {
      Authorization: `Bearer ${userToken}`,
      
    },
  };

  const PostComment = async () => {
    let body = {
      postId: postId,
      content: newComment,
    };

    console.log(body, userToken);
    await axios
      .patch(`${BASE_URL}/post/comment`, body, apiAuth)
      .then((response) => {
        const feedData = response.data;
        console.log("comment data", feedData);
        setNewComment("");
        updateComents();
      })
      .catch((error) => {
        console.error("requeat error:", error);
      });
  };

  const handleDelete = async () => {
    try {
      const body = {
        postId: postId,
        commentId: commentToDelete,
      };
  
      await axios({
        method: 'delete',
        url: `${BASE_URL}/post/deleteComment`,
        headers: {Authorization: `Bearer ${userToken}`},
        data: body,
      });
  
      updateComents();
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };
  

  const DeleteConfirmation = ({ visible, closePopup, handleDelete, id }) => {
    if (!visible) return null;

    return (
      <View style={styles.deletecontainer}>
        <View style={styles.popup}>
          <Text style={styles.titleText}>Delete Comment</Text>
          <Text style={styles.messageText}>
            Are you sure you want to delete this comment?
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDelete}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={closePopup}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };



  return (
    <View>
      <TouchableOpacity onPress={toggleCommentBox}>
        <Image
          style={{ height: 30, width: 30, bottom: 2 }}
          source={require("../assets/chat.png")}
        />
        <Text
          style={{
            fontSize: 8,
            position: "absolute",
            right: 0,
            color: "white",
            backgroundColor: "red",
            paddingHorizontal: 4,
            borderRadius: 100,
          }}
        >
          {postdata.comment.length}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={showCommentBox}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleCommentBox}
      >
        <View style={styles.modalContainer}>
          <DeleteConfirmation
            visible={showDeleteConfirmation}
            closePopup={() => setShowDeleteConfirmation(false)}
            handleDelete={handleDelete}
          />
          <View
            style={{
              width: "100%",
              height: "8%",
              alignItems: "center",
              borderBottomWidth: 1,
              borderBottomColor: "#7393B3",
            }}
          >
            <TouchableOpacity
              style={{
                position: "absolute",
                top: 20,
                position: "center",
                paddingVertical: 8,
                paddingHorizontal: 20,
                borderRadius: 20,
                backgroundColor: "red",
              }}
              onPress={toggleCommentBox}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "100%",
            }}
          >
            <FlatList
              data={postdata.comment}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <View style={styles.commentItem} key={item._id}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.username}>
                      {item.createdBy.userName}
                    </Text>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <FormattedDate date={item.createdAt} />
                      <TouchableOpacity
                        onPress={() => {
                          setShowDeleteConfirmation(true);
                          setCommentToDelete(item._id);
                        }}
                      >
                        <Image
                          style={{ width: 15, height: 17, marginLeft: 5 }}
                          source={require("../assets/dots.png")}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text style={styles.commentText}>{item.content}</Text>
                </View>
              )}
            />
          </View>
          <View style={styles.commentInputContainer}>
            <TextInput
              placeholder="Type your comment here"
              value={newComment}
              onChangeText={(text) => setNewComment(text)}
              style={styles.commentInput}
            />
            <TouchableOpacity onPress={PostComment} style={styles.postButton}>
              <Text style={styles.postButtonText}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 20,
  },
  commentItem: {
    flex: 1,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  closeText: {
    color: "white",
    fontWeight: "bold",
  },
  username: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  commentText: {
    marginBottom: 10,
  },
  commentInputContainer: {
    paddingVertical: 10,
    position: "absolute",
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "#f5f5f5",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  commentInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 20,
    marginRight: 10,
  },
  postButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#007bff",
  },
  postButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  deletecontainer: {
    borderRadius: 20,
    position: "absolute",
    zIndex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popup: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  messageText: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  deleteButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#007bff",
  },
  cancelButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#007bff",
  },
  buttonText: {
    color: "#007bff",
    fontWeight: "bold",
  },
});

export default CommentComponent;
