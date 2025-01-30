import React, { useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';
import { Link, useNavigation } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { signIn } from '../middleware/api'; // Import the signIn function

export default function SignInScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  const handleSignIn = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    setIsLoading(true);

    try {
      await signIn(username, password);
      setIsLoading(false);
      Alert.alert('Success', 'You have successfully signed in!');
      navigate.navigate('Home');
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error', 'Failed to sign in. Please check your credentials and try again.');
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
        Don't have an account? <Link href="/Signup" asChild><ThemedText>Sign Up</ThemedText></Link>
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