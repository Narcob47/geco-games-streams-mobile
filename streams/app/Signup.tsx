import React, { useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';
import { Link, useNavigation } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { signUp } from '../middleware/api'; // Import the signUp function

export default function SignUpScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  const handleSignUp = async () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    setIsLoading(true);

    try {
      await signUp({ username, email, password });
      setIsLoading(false);
      Alert.alert('Success', 'You have successfully signed up!');
      navigate.navigate('Signin');
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error', 'Failed to sign up. Please try again.');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <TextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        mode="outlined"
        style={styles.input}
        autoCapitalize="none"
        theme={{ colors: { primary: Colors.app.primary } }}
      />
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
      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        mode="outlined"
        style={styles.input}
        secureTextEntry
        theme={{ colors: { primary: Colors.app.primary } }}
      />
      <Button
        mode="contained"
        onPress={handleSignUp}
        loading={isLoading}
        disabled={isLoading}
        style={styles.button}
        theme={{ colors: { primary: Colors.app.primary } }}
      >
        <ThemedText>Sign Up</ThemedText>
      </Button>
      <Button mode="text" style={styles.link} theme={{ colors: { primary: Colors.app.secondary } }}>
        Already have an account? <Link href="/Signin" asChild><ThemedText>Sign In</ThemedText></Link>
      </Button>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
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