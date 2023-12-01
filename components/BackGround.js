import { Text, View, StyleSheet, ImageBackground,Image } from 'react-native';

export default function BackGround({ children }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/socialmedia.jpg')}
        style={styles.box}
      />
      <View style={styles.children}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },

  box: {
    width:'100%',
    height:'100%',
  },

  children: {
    width:'100%',
    height:'100%',
    justifyContent:'center',
    position: 'absolute',
    alignItems:'center'
  },
});
