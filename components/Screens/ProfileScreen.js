import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../../config";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { FlatList, RefreshControl } from "react-native-gesture-handler";


export default function Profile() {
  const { userToken, userid } = useContext(AuthContext);
  const [userPosts, setUserPosts] = useState([]);
  const [userName, setUserName] = useState("");
  const [profileImg, setProfileImg] = useState(
    "https://placekitten.com/200/200"
  );
  const [refresh, setRefresh] = useState(false);

  const refreshing = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };
  const postdata = async () => {
    await axios
      .get(`${BASE_URL}/post?userId=${userid}&limit=100`)
      .then((response) => {
        const userProfilePosts = response.data.data;
        setUserPosts(userProfilePosts);
      })
      .catch((error) => {
        console.error("There was a problem with the request:", error);
      });
  };

  const apiAuth = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };

  const userinfo = async () => {
    await axios
      .get(`${BASE_URL}/user/getUser?id=${userid}`, apiAuth)
      .then((response) => {
        console.log("User info:", response.data);
        setUserName(response.data.userName);
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
      });
  };

  useEffect(() => {
    userinfo();
    postdata();
  }, []);

  useEffect(() => {
    async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    };
  }, []);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.uri) {
        setProfileImg(result.uri);

        const formData = new FormData();
        formData.append("photo", {
          uri: result.uri,
          type: "image/jpeg",
          name: "photo.jpg",
        });
        
        await axios.post(`${BASE_URL}/user/addPhoto`, formData, {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Image uploaded");

      } else {
        console.log("Image selection cancelled or failed");
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };
  

  const renderPostItem = ({ item }) => (
    <TouchableOpacity style={styles.postContainer}>
      <Image
        source={require("../assets/NOiMAGE.png")}
        style={styles.postImage}
      />
      <Text style={styles.postTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={pickImage}>
          <Image source={{ uri: profileImg }} style={styles.profileImage} />
        </TouchableOpacity>
        <View style={{flex:1,flexDirection:"row",justifyContent:"space-between"}}>
        <Text style={styles.username}>{userName}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Follow</Text>
        </TouchableOpacity>
        </View>
      </View>
      <Text
        style={{
          fontSize: 18,
          paddingHorizontal: 10,
          fontWeight: "600",
          color: "gray",
          paddingVertical: 5,
        }}
      >
        My posts
      </Text>
      <FlatList
        data={userPosts}
        renderItem={renderPostItem}
        keyExtractor={(item) => item._id}
        style={styles.postList}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => {
              postdata();
              refreshing();
            }}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  postList: {
    width: "100%",
    marginBottom: 10,
  },
  button: {
    position:'relative',
    right:40,
    backgroundColor: "#3498db",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  profileContainer: {
    paddingHorizontal: 10,
    paddingVertical: 30,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 15,
    backgroundColor: "white",
    borderRadius: 10,
    shadowOpacity: 0.3,
    shadowRadius: 4.84,
    shadowColor: "black",
    shadowOffset: {
      width: 1,
      height: 3,
    },
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  username: {
    fontSize: 18,
    paddingLeft: 10,
    fontWeight: "bold",
  },
  postContainer: {
    flex: 1,
    margin: 5,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    shadowColor: "black",
    shadowOffset: {
      width: 1,
      height: 3,
    },
  },
  postImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  postTitle: {
    fontSize: 12,
    fontWeight: "500",
    padding: 7,
  },
});
