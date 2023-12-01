import { Text, View, StyleSheet, Image } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { FlatList } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-web';
import AppStack from '../AppStack';
import App from '../../App';

export default function AppScreen(props) {
  const[data,setData]=useState([]);

  const postdata = () => {
    axios
    .get(`${BASE_URL}/post`)
      .then((response) => {
        const feedData = response.data;
        setData(feedData);
      })
      .catch((error) => {
        console.error('There was a problem with the request:', error);
      });

  };
  useEffect(()=>{
    postdata();
  },[])

  return (
  
    <View style={styles.container}>
      <View style={styles.headerbox}>
      <TouchableOpacity onPress={()=>props.navigation.openDrawer()}>
      <Image style={styles.menu} source={require('../assets/menu.png')}  />
      </TouchableOpacity>
      <Text style={styles.Appname}>VibeLink</Text>
      </View>
      <View style={styles.children}>

       <AppStack/>
      </View>

       <View style={styles.buttonContainer}>
       <TouchableOpacity style={styles.button}
          onPress={() => props.navigation.navigate('Home')}
        >
           <Image source={require('../assets/home.png')} style={styles.bottomButton} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}
          onPress={() => props.navigation.navigate('createpost')}
        >
          <Image style={styles.createbutton} source={require('../assets/create.png')}  />
        </TouchableOpacity>


        <TouchableOpacity style={styles.button}
          onPress={() => props.navigation.navigate('profile')}
        >
           <Image source={require('../assets/user.png')} style={styles.bottomButton} />
        </TouchableOpacity>
       
      </View>
  </View>
  );
}

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
      height:40,
      width:40,
      shadowOpacity:0.50,
      shadowRadius: 1.84,
      shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 1,
    },
},

bottomButton:{
  height:25,
  width:25,
  
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
    padding:10,
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
    width: '100%',
    aspectRatio: 1/1,
  },
 
});


