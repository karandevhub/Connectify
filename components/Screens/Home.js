import { Text, View } from "react-native";
import { Image, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import axios from "axios";
import { BASE_URL } from "../../config";
import { AuthContext } from "../context/AuthContext";

export function Home() {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(15);
  const [refresh, setRefresh] = useState(false);

  const refreshing = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };


  

  const postdata = async () => {
    await axios
      .get(`${BASE_URL}/post?limit=${limit}`)
      .then((response) => {
        const feedData = response.data.data;
        setData(feedData);
        console.log("Signup successful. Token:", feedData);
      })
      .catch((error) => {
        console.error("There was a problem with the request:", error);
      });
  };
  useEffect(() => {
    postdata();
  }, [limit]);

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
      <View style={{ alignItems: "baseline" }}>
        <Text style={{ color: "gray" }}>{formattedDate}</Text>
      </View>
    );
  };

  const { userToken } = useContext(AuthContext);
  const apiAuth = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };

  const LikeStatus = ({ postId, likes, updateLikes }) => {
    const { userid } = useContext(AuthContext);
    const [likeImage, setLikeImage] = useState(require("../assets/heart.png"));
   
    const handleLike = async () => {
    

      try {
        await axios.patch(`${BASE_URL}/post/like/${postId}`, {}, apiAuth);
        updateLikes();
      } catch (error) {
        console.error("Error liking the post:", error);
      }
    };

    useEffect(() => {
      const liked = likes.includes(userid);
      if (liked) {
        setLikeImage(require("../assets/redheart.png"));
      } else {
        setLikeImage(require("../assets/heart.png"));
      }
    }, []);

    return (
      <TouchableOpacity onPress={handleLike}>
        <Image style={{ height: 25, width: 27 }} source={likeImage} />
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <View style={styles.card} key={item._id}>
          <View style={styles.header}>
            <Image
              source={require("../assets/account.png")}
              style={styles.profileImage}
            />
            <View style={styles.userInfo}>
              <Text style={styles.name}>{item.createdBy.userName}</Text>
              <Text style={styles.title}>{item.title}</Text>
            </View>
          </View>
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("../assets/NOiMAGE.png")}
              style={styles.postImage}
              resizeMode="cover"
            />
          </View>
          <View>
            <View
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 10,
              }}
            >
              <View>
                <LikeStatus
                  postId={item._id}
                  likes={item.like}
                  updateLikes={postdata}
                />

                <Text>{`${item.like.length} Likes`}</Text>
              </View>
              <View>
                <FormattedDate date={item.createdAt} />
              </View>
            </View>
            <Text style={styles.userContent}>
              <Text style={styles.name}>{item.createdBy.userName}</Text>
              <Text style={styles.title}> {item.content}</Text>
            </Text>
          </View>
        </View>
      )}
      keyExtractor={(item) => item._id}
      onEndReached={() => {
        setLimit((prev) => prev + 10);
      }}
      onEndReachedThreshold={3}
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
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    overflow: "hidden",
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  scrollView: {
    backgroundColor: "pink",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },

  userContent: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 5,
  },
  userInfo: {
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  title: {
    fontSize: 14,
  },
  postImage: {
    marginBottom: 5,
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    borderRadius: 5,
  },
});

export default Home;
