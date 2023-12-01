import { Text, View, StyleSheet, Image } from 'react-native';
import BackGround from '../BackGround';
import Btn from '../Btn';

export default function LoginSignup(props) {
  return (
    <BackGround>
      <View style={styles.container}>
        <Text style={styles.text}>VibeLink</Text>
        <View style={styles.loginBtn}>
          <Btn
            btnTxt="Login"
            btnColor={'#03658c'}
            breadth={250}
            txtColor="white"
            Press={() => props.navigation.navigate('Login')}
          />
        </View>
        <View style={styles.signupBtn}>
          <Btn
            btnTxt="Sign Up"
            btnColor="#03658c"
            breadth={250}
            txtColor="white"
            Press={() => props.navigation.navigate('Signup')}
          />
        </View>
      </View>
    </BackGround>
  );
}

const styles = StyleSheet.create({
  container: {
    display:'flex',
    justifyContent:'center',
    alignItems: 'center',
  },

  loginBtn: {
    marginTop: 50,
  },

  signupBtn: {
    marginTop: 30,
  },

  text: {
    marginTop: 100,
    fontSize: 64,
    fontWeight: 500,
    color: 'white',
    textAlign: 'center',
  },
});
