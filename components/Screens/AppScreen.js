import { Text, View, StyleSheet, Image, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import AppStack from '../AppStack';
import CommentComponent from './Comment';


export default function AppScreen(props) {

  return (
  
    <SafeAreaView style={styles.container}>
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
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    width:'100%',
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
    paddingTop:28,
    paddingBottom:10,
    flexDirection:'row',
    backgroundColor:'#007bff',
    alignItems:'center',
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
      width:46,
      shadowOpacity:0.50,
      shadowRadius: 1.84,
      shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 1,
    },
},

button:{
  padding:2
},

bottomButton:{
  height:25,
  width:25,
  
},


  buttonContainer: {
    width:'100%',
    flexDirection:'row',
    position: 'absolute',
    bottom:0,
    alignItems: 'center',
    backgroundColor:'white',
    alignItems:'center',
    justifyContent:'space-between',
    paddingBottom:7,
    paddingTop:2,
    paddingHorizontal:20,
    shadowOpacity:0.30,
      shadowRadius: 4.84,
      shadowColor: 'black',
    shadowOffset: {
      width:1,
      height:0,
    },
  },


  Appname:{
        fontSize:20,
        fontWeight:'bold',
        color:'white',
        backgroundColor:'#007bff',
  },
 
});


