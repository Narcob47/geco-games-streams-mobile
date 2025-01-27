import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, TextInput, Text, useTheme } from 'react-native-paper';
import { Link } from 'expo-router';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  const handleSignUp = () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    setIsLoading(true);

    // Simulate a sign-up API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Success', 'You have successfully signed up!');
      // Navigate to the sign-in screen or home screen after successful sign-up
    }, 2000);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        style={styles.input}
        secureTextEntry
      />

      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        mode="outlined"
        style={styles.input}
        secureTextEntry
      />

      <Button
        mode="contained"
        onPress={handleSignUp}
        loading={isLoading}
        disabled={isLoading}
        style={styles.button}
      >
        Sign Up
      </Button>

      <Link href="/Signin" asChild>
        <Button mode="text" style={styles.link}>
          Already have an account? Sign In
        </Button>
      </Link>
    </View>
  );
}

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