import { useState } from 'react';
import { StyleSheet, Image, TouchableOpacity, useColorScheme, View } from 'react-native';
import { Button } from 'react-native-paper';
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {Colors} from '@/constants/Colors';


const onboardingSlides = [
  {
    id: '1',
    title: 'Welcome to Arts Plus',
    description: 'A Geco Games Limited Streaming Service.',
    image: require('@/assets/images/onboarding/3.png'), // Replace with your image path
  },
  {
    id: '2',
    title: 'A place to enjoy your entertainment',
    description: 'Simple and intuitive user interface.',
    image: require('@/assets/images/onboarding/4.png'), // Replace with your image path
  },
  {
    id: '3',
    title: 'Get Started',
    description: 'Join us and start your journey today.',
    image: require('@/assets/images/onboarding/5.png'), // Replace with your image path
  },
];

export default function OnboardingScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const colorScheme = useColorScheme();

  const handleNext = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const renderDots = () => {
    return (
      <View style={styles.dotsContainer}>
        {onboardingSlides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor: colorScheme === 'dark' ? 'white' : 'black',
                opacity: index === currentSlide ? 1 : 0.3,
              },
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <Image source={onboardingSlides[currentSlide].image} style={styles.image} />
      <ThemedText style={styles.title}>
        {onboardingSlides[currentSlide].title}
      </ThemedText>
      <ThemedText style={styles.description}>
        {onboardingSlides[currentSlide].description}
      </ThemedText>
      {renderDots()}
      {currentSlide === onboardingSlides.length - 1 ? (
        <Link href="/Signin" asChild>
          <Button mode="contained" style={styles.button}>
            <ThemedText>Get Started</ThemedText>
          </Button>
        </Link>
      ) : (
        <TouchableOpacity onPress={handleNext} style={styles.arrowButton}>
          <MaterialIcons
            name="arrow-forward"
            size={24}
            color={colorScheme === 'dark' ?  Colors.light.text : Colors.dark.text}
          />
        </TouchableOpacity>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  dotsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 50,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  button: {
    width: '50%',
    height: '5%',
    marginTop: 20,
    backgroundColor: Colors.app.primary,
     // Added color from
  },
  arrowButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 50,
    backgroundColor: Colors.app.primary, // Added color from Colors
  },
});