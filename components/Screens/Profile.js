import { StyleSheet, Text, View } from 'react-native'
import { Image } from 'react-native-web';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../../config';
import axios from 'axios';
import { FlatList } from 'react-native-web';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Profile(){
const {userToken,userid}=useContext(AuthContext);
const [userPosts, setUserPosts] = useState([]);
const[userName,setUserName]=useState('')

useEffect(()=>{
  axios.get(`${BASE_URL}/post`)
  .then(response => {
    console.log('User data:', response.data.data);
    const userData=response.data.data;
    const filteredPosts = userData.filter((post) => post.createdBy._id === userid);
        setUserPosts(filteredPosts)
        setUserName(filteredPosts[0].createdBy.userName)
  })
  .catch(error => {
    console.error('Error fetching user data:', error);
  });
},[])


const renderPostItem = ({ item }) => (
  <View style={styles.postContainer}>
    <Image source={require('../assets/NOiMAGE.png')} style={styles.postImage} />
    <Text style={styles.postTitle}>{item.title}</Text>

  </View>
);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://placekitten.com/200/200' }} 
          style={styles.profileImage}
        />
        <Text style={styles.username}>{userName}</Text> 
      </View>
      <Text style={{fontSize:18,paddingHorizontal:10,fontWeight:500,color:'gray',paddingVertical:5}}>My posts</Text>
      <FlatList
        data={userPosts} 
        renderItem={renderPostItem}
        keyExtractor={(item) => item._id}
        style={styles.postList}
        numColumns={2} 
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: '#f0f0f0',
  },
  postList: {
    width: '100%',
  },
  profileContainer: {
    paddingHorizontal:10,
    paddingVertical:20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor:'white',
    borderRadius:10,
    shadowOpacity:0.30,
    shadowRadius: 4.84,
    shadowColor: 'black',
  shadowOffset: {
    width:1,
    height:3,
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
    paddingLeft:10,
    fontWeight: 'bold',
  },
  postContainer: {
    flex: 1,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    shadowOpacity:0.30,
    shadowRadius: 3.84,
    shadowColor: 'black',
  shadowOffset: {
    width:1,
    height:3,
  },
  },
  postImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  postTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    padding: 5,
  },

});


