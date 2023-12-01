import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';


const SplashScreen = () => {

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>VibeLink</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.contentText}>
          Discover, Connect, and Share Moments
        </Text>
      </View>
      <TouchableOpacity style={styles.footerButton}>
        <Text style={styles.footerButtonText}>Start Exploring Now!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007bff', 
  },
  header: {
    marginTop: '50%',
  },
  logo: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    marginTop: 50,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  contentText: {
    fontSize: 25,
    color: '#fff',
    textAlign: 'center',
  },
  footerButton: {
    marginTop: 'auto',
    marginBottom: 100,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  footerButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
  },
});

export default SplashScreen;
