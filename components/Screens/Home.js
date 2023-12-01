import { Text, View } from 'react-native'
import { Image, TouchableOpacity } from 'react-native-web';
import React, { Component, useEffect, useState } from 'react'
import { StyleSheet } from 'react-native-web';
import { FlatList } from 'react-native-gesture-handler';
import axios from 'axios';
import { BASE_URL } from '../../config';

export function Home() {
    const[data,setData]=useState([]);

    const postdata = () => {
      axios
      .get(`${BASE_URL}/post`)
        .then((response) => {
          const feedData = response.data.data;
          setData(feedData);
          console.log('Signup successful. Token:',feedData);
        })
        .catch((error) => {
          console.error('There was a problem with the request:', error);
        });
  
    };
    useEffect(()=>{
      postdata();
    },[])
  

    const formatDate = (inputDate) => {
      const date = new Date(inputDate);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      
      const formattedDay = day < 10 ? `0${day}` : `${day}`;
      const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    
      return `${formattedDay}/${formattedMonth}/${year}`;
    };
    
    const FormattedDate = ({ date }) => {
      const formattedDate = formatDate(date);
    
      return (
        <View>
          <Text>{formattedDate}</Text>
        </View>
      );
    };
    
      
      const [liked, setLiked] = useState(false);
      const [likeCount, setLikeCount] = useState(0);
      const[likeImage, setLikeImage]=useState(require('../assets/heart.png'))

      const handleLike = () => {
        setLiked(!liked);
        setLikeCount(liked ? (likeCount - 1) : (likeCount + 1));
        setLikeImage(liked ? require('../assets/redheart.png') : require('../assets/heart.png'))
      };

     
    return (
      
        <FlatList
        data={data}
        renderItem={({item}) => (
           
          <View style={styles.postContainer} key={item._id}>
          <View style={styles.card}>
              <View style={styles.header}>
                <Image source={require('../assets/account.png')} style={styles.profileImage} />
                <View style={styles.userInfo}>
               <Text style={styles.name}>{item.createdBy.userName}</Text>
               <Text style={styles.title}>{item.title}</Text>
             </View>
             </View>
                <Image source={require('../assets/NOiMAGE.png')} style={styles.postImage} />
              <View>
                <View style={{display:'flex',width:'100%',justifyContent:'space-between',flexDirection:'row', alignItems:'center',paddingHorizontal:10}}>
                    <View>
                    <TouchableOpacity onPress={handleLike}>
                        <Image style={{height:25,width:27,}} source={likeImage}/>
                    </TouchableOpacity>
                    <Text>{`${likeCount} Likes`}</Text>
                    </View>
                      <View style={{}}>
                          <FormattedDate date={item.createdAt} />
                      </View>
                </View>
               <Text style={styles.userContent}>
               <Text style={styles.name}>{item.createdBy.userName}</Text>
               <Text style={styles.title}> {item.content}</Text>
               </Text>
             </View>
       </View>
   </View>
        )}
        keyExtractor={item => item._id}
      />
    
    )
};

const styles = StyleSheet.create({
    container:{
      flex:1,
      width:'100%',
    },
  
    postContainer:{
      paddingVertical:10,
    },
  
    children:{
      flex:1,
      marginTop:50,
      padding:10,
      marginBottom:40,
    },
  
    headerbox:{
      width:'100%',
      zIndex:1,
      position:'absolute',
      top:0,
      paddingLeft:12,
      paddingVertical:15,
      flexDirection:'row',
      backgroundColor:'#007bff',
      alignItems:'center',
      marginBottom:5,
      shadowOpacity:0.30,
      shadowRadius: 4.84,
      shadowColor: 'black',
    shadowOffset: {
      width:1,
      height:3,
    },
    },
  
    menu:{
        height:25,
        width:25,
        marginRight:10
    },
  
  createbutton:{
        height:45,
        width:45,
        shadowOpacity:0.50,
        shadowRadius: 1.84,
        shadowColor: 'black',
      shadowOffset: {
        width: 1,
        height: 1,
      },
  },
  
  bottomButton:{
    height:30,
    width:30,
    
  },
  
    card: {
      borderRadius: 10,
      overflow: 'hidden',
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
  
    buttonContainer: {
      width:'100%',
      flexDirection:'row',
      position: 'absolute',
      bottom:-1,
      alignItems: 'center',
      backgroundColor:'white',
      alignItems:'center',
      justifyContent:'space-between',
      paddingVertical:4,
      paddingHorizontal:20,
      shadowOpacity:0.30,
        shadowRadius: 4.84,
        shadowColor: 'black',
      shadowOffset: {
        width:1,
        height:0,
      },
    },
  
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  
    Appname:{
          fontSize:20,
          fontWeight:700,
          color:'white',
          backgroundColor:'#007bff',
    },
  
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    profileImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
    },
  
    userProfile:{
      position:'absolute',
      right:10,
      width: 30,
      height: 30,
      borderRadius: 20,
    },
  
  
    userContent:{
      paddingHorizontal:10,
      paddingBottom:10,
      paddingTop:5,
    },
    userInfo: {
      padding:10,
      justifyContent: 'center',
    },
    name: {
      fontWeight: 'bold',
      fontSize: 16,
    },
    title: {
      fontSize: 14,
    },
    postImage: {
      marginBottom:5,
      width: '100%',
      aspectRatio: 1/1,
    },
   
  });

export default Home