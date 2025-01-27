import React, { useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { Link } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {Colors} from '../constants/Colors';

const SignInScreen = () => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    setIsLoading(true);

    // Simulate a sign-in API call
    setTimeout(() => {
      setIsLoading(false);
      <Link href="/Home" />;
    }, 2000);
  };

  return (
    <ThemedView style={styles.container}>

      <ThemedText style={styles.title}>Sign In</ThemedText>

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        theme={{ colors: { primary: Colors.app.primary } }}
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        style={styles.input}
        secureTextEntry
        theme={{ colors: { primary: Colors.app.primary } }}
      />

      <Button
        mode="contained"
        onPress={handleSignIn}
        loading={isLoading}
        disabled={isLoading}
        style={styles.button}
        theme={{ colors: { primary: Colors.app.primary } }}
      >
        <ThemedText>Sign In</ThemedText>
      </Button>

      
        <Button mode="text" style={styles.link} theme={{ colors: { primary: Colors.app.secondary } }}>
          Don't have an account? <Link href="/Signup" asChild><Text>Sign Up</Text></Link> 
        </Button>
    </ThemedView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
  link: {
    marginTop: 15,
    alignSelf: 'center',
  },
});