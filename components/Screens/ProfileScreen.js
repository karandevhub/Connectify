import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../../config";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { FlatList, RefreshControl } from "react-native-gesture-handler";

export default function Profile(props) {
  const { userToken, userid,setIsLoading } = useContext(AuthContext);
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
      "Content-Type": "multipart/form-data",
    },
  };

  const userinfo = async () => {
    
    await axios
      .get(`${BASE_URL}/user/getUser?id=${userid}`, apiAuth)
      .then((response) => {
        console.log("User info:", response.data);
        setUserName(response.data.userName);
        setProfileImg(response.data.imageUrl);
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
      <View style={{flex:1,position:"relative",marginTop:15,marginLeft:5}}>
        <Text style={{fontSize:12,padding:5, color: "gray",position:"absolute",bottom:0 }}>{formattedDate}</Text>
      </View>
    );
  }

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.5,
        aspect:[1,1],
        allowsMultipleSelection: false,
      });
  
      if (!result.canceled) {
        
        setProfileImg(result.uri);
  
        const imageData = new FormData();
        imageData.append("photo", {
          uri: result.uri,
          type: "image/jpeg",
          name: "photo.jpg",
        });
  
       
        const response = await axios.post(`${BASE_URL}/user/addPhoto`, imageData, apiAuth);
        console.log("Image uploaded", response.data);
      } else {
        console.log("Image selection cancelled or failed");
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };
  const [selectedPost, setSelectedPost] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
const[postId,setPostId]=useState('')

  const handleDelete = async () => {
    try {
      await axios({
        method: 'delete',
        url: `${BASE_URL}/post/delete/${postId}`,
        headers: {Authorization: `Bearer ${userToken}`},
      });
      postdata();
      refreshing();
      setShowOptions(false)
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };
  


const UpdateDelete=()=>{
  return(
    <View style={styles.optionsOverlay}>
    <View style={styles.optionsContainer}>
      <TouchableOpacity onPress={()=>{setShowOptions(false)}} style={{height:25,width:25,position:'absolute',top:-5,right:-5}}>
    <Image source={require("../assets/multiply.png")} style={{height:23,width:23}}/>
    </TouchableOpacity>
    <Text style={{marginBottom:10}}>Do you want to?</Text>
      <View style={{display:"flex",flexDirection:"row",gap:26,width:"100%",alignItems:"center",justifyContent:"center"}}>
      <TouchableOpacity style={styles.optionButton} onPress={()=>{
        setShowOptions(false);
        props.navigation.navigate("UpdatePost")}}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.optionButton, styles.deleteButton]} onPress={handleDelete}>
        <Text style={[styles.buttonText, { color: '#fff' }]}>Delete</Text>
      </TouchableOpacity>
      </View>
    </View>
  </View>
  )
}

  const renderPostItem = ({ item }) => {
    const renderContentWithTags = (content) => {
      const pattern = /(#\w+)/g; // 
      const parts = content.split(pattern); 
      return parts.map((part, index) => {
        if (part.match(pattern)) {
          return (
            <Text key={index} style={{ color: 'blue' }}>
              {part}
            </Text>
          );
        } else {
          return <Text key={index}>{part}</Text>;
        }
      });
    };

    const handlePostClick = (postId) => {
      setPostId(postId); 
      setShowOptions(true);
    };
    
    return (
    <TouchableOpacity style={styles.postContainer} onPress={() => handlePostClick(item._id)} >
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.content}>{renderContentWithTags(item.content)}</Text>
      <FormattedDate date={item.createdAt} />
    </TouchableOpacity>
  )}
  ;

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={pickImage}>
          <Image source={{ uri: profileImg }} style={styles.profileImage} />
          <Image source={require("../assets/plus.png")} style={{height:13,width:13,position:'absolute', bottom:0,right:13}}/>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
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
      {showOptions && (<UpdateDelete/>)}
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
    position: "relative",
    right: 40,
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
    marginHorizontal:10,
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
  optionsOverlay: {
    position: 'absolute',
    zIndex:2,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  optionButton: {
    backgroundColor: '#3498db',
    padding: 8,
    width: '40%',
    justifyContent:"center",
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  profileImage: {
    width: 55,
    height: 55,
    borderRadius: 30,
    marginRight: 10,
    borderWidth:1,
    borderColor:"black"
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
    fontSize: 14,
    fontWeight: "600",
    padding: 7,
  },
  content:{
    fontSize: 13,
    fontWeight: "500",
    padding: 10,
    marginBottom:10,
  }
});
