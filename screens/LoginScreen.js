import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from "../config/firebase-config";
import NowPlayingScreen from './NowPlayingScreen';
import HomeScreen from './HomeScreen';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = ({route}) => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('1@gmail.com');
  const [password, setPassword] = useState('12345678');


  const onSignInClicked = async() => {
    try{
      const userCredentials = await signInWithEmailAndPassword(auth, email, password)
      const returnScreen = route.params?.returnScreen || null ;
      if (returnScreen){
        navigation.goBack()
      }else{
        navigation.navigate('HomeScreen');
      }

    }catch(err){
      Alert.alert(`Error occured ${err}`)
    }
  }

  onSkipClicked = () => {
    navigation.navigate('HomeScreen');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        autoCapitalize="none"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={onSignInClicked} >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signupText}>Don't have an account? Signup</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
        <Text style={styles.signupText}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#1a73e8',
    padding: 10,
    borderRadius: 4,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  signupText: {
    marginTop: 20,
    color: '#1a73e8',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
