import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import BackGround from '../BackGround';
import Btn from '../Btn';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function RegisterScreen(props) {

  const {signup} = useContext(AuthContext);
  const [userName,setUserName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  
  return (
    <BackGround>
      <View>
          <Text style={styles.headerTxt}>Sign up</Text>
        </View>
      <View style={styles.container}>

        <View style={styles.loginConatiner}>
          <View>
            <Text style={styles.innerBoxHeader}>create your account</Text>
          </View>
          <TextInput
            placeholder="Enter Email"
            value={email}
            onChangeText={text=>setEmail(text)}
            style={styles.fieldinput}></TextInput>
          <TextInput
            placeholder="Enter username"
            value={userName}
            onChangeText={text=>setUserName(text)}
            style={styles.fieldinput}></TextInput>

          <TextInput
            placeholder="Enter Password"
            secureTextEntry={true}
            value={password}
            style={styles.fieldinput}
            onChangeText={text=>setPassword(text)}
            ></TextInput>

          <View style={styles.buttonArea}>
            <Btn
              btnTxt="Signup"
              btnColor={'#03658c'}
              txtColor="white"
              breadth={200}
              Press={() => signup(userName,email,password)}
            />
            <View
              style={{ display: 'flex', flexDirection: 'row', marginTop: 15 }}>
              <Text>Already have an acccount? </Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Login')}
                >
               <Text style={{ fontWeight:'bold',color:'red' }}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </BackGround>
  );
}





const styles = StyleSheet.create({
  headerTxt: {
    marginTop: '49%',
    fontWeight: 500,
    color: 'white',
    fontSize: 40,
    marginBottom: '48%',
  },
  container: {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    alignItems: 'center',
    width:'100%'
  },

  fieldinput: {
    paddingVertical:12,
    marginTop: '5%',
    width: '80%',
    borderRadius: 100,
    backgroundColor: 'rgb(220,220,220)',
    paddingLeft: 20,
    placeholderTextColor: '	#808080',
    marginBottom: '5%',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },

  buttonArea: {
    position:'absolute',
    bottom:30,
    marginTop:'30%',
  },

  loginConatiner: {
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  innerBoxHeader: {
    marginTop: '20%',
    marginBottom: '15%',
    fontSize: 20,
    fontWeight: 500,
    color: '#808080',
  },
});
