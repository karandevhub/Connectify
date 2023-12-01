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
import { AuthContext } from '../context/AuthContext';
import { useContext, useState } from 'react';

export default function LoginScreen(props) {
  const { login } = useContext(AuthContext);
  const [email,setEmail]=useState(undefined);
  const [password,setPassword]=useState(undefined);
  return (
    <BackGround>
      <View>
          <Text style={styles.headerTxt}>Welcome back</Text>
        </View>
      <View style={styles.container}>
        

        <View style={styles.loginConatiner}>
          <View>
            <Text style={styles.innerBoxHeader}>Login to your account</Text>
          </View>
        
          <TextInput
            placeholder="Enter your email"
            style={styles.fieldinput}
            value={email}
            onChangeText={text=>setEmail(text)}
            ></TextInput>
          <TextInput
            placeholder="Enter your password"
            secureTextEntry={true}
            style={styles.fieldinput}
            value={password}
            onChangeText={text=>setPassword(text)}
            ></TextInput>
           
          <View style={{ width: '100%', alignItems: 'end', marginRight:70, marginTop:10}}>
            <TouchableOpacity
              style={{ fontWeight: 'bold' }}
              >
              <Text style={{ fontWeight: 'bold',color:'red' }}>forgot password?</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonArea}>
            <Btn
              btnTxt="Login"
              btnColor={'#03658c'}
              txtColor="white"
              breadth={200}
              Press={() => {
                login(email,password)
              }}
            />
            <View
              style={{ display: 'flex', flexDirection: 'row', marginTop: 15,fontSize:18}}>
              <Text>Don't have an acccount? </Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Signup')}
                >
                <Text style={{ fontWeight: 'bold',color:'red' }}>Sign up</Text>
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
    marginTop: '25%',
    fontWeight: 500,
    color: 'white',
    fontSize: 40,
    marginBottom: '25%',
  },
  container: {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    color: 'red',
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
