import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, ScrollView, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen: React.FC = () => {
  const recommendedMovies = [
    { id: '1', title: 'Episode 1', image: require('@/assets/images/onboarding/1.jpg') },
    { id: '2', title: 'Episode 2', image: require('@/assets/images/onboarding/1.jpg') },
    { id: '3', title: 'Episode 3', image: require('@/assets/images/onboarding/1.jpg') },
    { id: '4', title: 'Episode 4', image: require('@/assets/images/onboarding/1.jpg') },
    { id: '5', title: 'Episode 5', image: require('@/assets/images/onboarding/1.jpg') },
    { id: '6', title: 'Episode 6', image: require('@/assets/images/onboarding/1.jpg') },
    { id: '7', title: 'Episode 7', image: require('@/assets/images/onboarding/1.jpg') },
    { id: '8', title: 'Episode 8', image: require('@/assets/images/onboarding/1.jpg') },
    { id: '9', title: 'Episode 9', image: require('@/assets/images/onboarding/1.jpg') },
    { id: '10', title: 'Episode 10', image: require('@/assets/images/onboarding/1.jpg') },
  ];

  const genreCategories = [
    {
      genre: 'Action',
      movies: [
        { id: '1', title: 'Action Movie 1', image: require('@/assets/images/onboarding/1.jpg') },
        { id: '2', title: 'Action Movie 2', image: require('@/assets/images/onboarding/1.jpg') },
        { id: '1', title: 'Action Movie 1', image: require('@/assets/images/onboarding/1.jpg') },
        { id: '2', title: 'Action Movie 2', image: require('@/assets/images/onboarding/1.jpg') },
      ],
    },
    {
      genre: 'Drama',
      movies: [
        { id: '3', title: 'Drama Movie 1', image: require('@/assets/images/onboarding/1.jpg') },
        { id: '4', title: 'Drama Movie 2', image: require('@/assets/images/onboarding/1.jpg') },
        { id: '1', title: 'Action Movie 1', image: require('@/assets/images/onboarding/1.jpg') },
        { id: '2', title: 'Action Movie 2', image: require('@/assets/images/onboarding/1.jpg') },
      ],
    },
  ];

  const renderRecommendedItem = ({ item }: any) => (
    <View style={styles.recommendedItem}>
      <Image source={item.image} style={styles.recommendedImage} />
      <Text style={styles.recommendedTitle}>{item.title}</Text>
    </View>
  );

  const renderGenreSection = () => (
    genreCategories.map((category) => (
      <View key={category.genre} style={styles.genreSection}>
        <Text style={styles.genreTitle}>{category.genre}</Text>
        <FlatList
          data={category.movies}
          renderItem={renderRecommendedItem}
          keyExtractor={(item) => item.id}
          horizontal
          contentContainerStyle={styles.recommendedList}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    ))
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity>
            <Ionicons name="menu" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="search" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <ImageBackground 
          source={require('@/assets/images/onboarding/1.jpg')} 
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={styles.movieInfoContainer}>
            <Text style={styles.releaseDate}>May 17</Text>
            <Text style={styles.genre}>action, thriller</Text>
            <Text style={styles.movieTitle}>Siame's Promise</Text>
            <Text style={styles.subtitle}>Chapter 1 : "Welcome to the Southern" - 2025</Text>

            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.watchButton}>
                <Text style={styles.watchButtonText}>Watch now</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.trailerButton}>
                <Text style={styles.trailerButtonText}>Trailer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>

        <Text style={styles.sectionTitle}>Episode Guide</Text>

        <FlatList
          data={recommendedMovies}
          renderItem={renderRecommendedItem}
          keyExtractor={(item) => item.id}
          horizontal
          contentContainerStyle={styles.recommendedList}
          showsHorizontalScrollIndicator={false}
        />
        {/* {renderGenreSection()} */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  backgroundImage: {
    width: '100%',
    height: 400,
    justifyContent: 'flex-end',
  },
  movieInfoContainer: {
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  releaseDate: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 4,
  },
  genre: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 16,
  },
  movieTitle: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: '#AAAAAA',
    fontSize: 16,
    marginBottom: 24,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  watchButton: {
    backgroundColor: '#09E577FF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  watchButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  trailerButton: {
    borderWidth: 1,
    borderColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  trailerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  recommendedList: {
    padding: 16,
  },
  recommendedItem: {
    marginRight: 16,
    alignItems: 'center',
  },
  recommendedImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  recommendedTitle: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
    marginVertical: 8,
  },
  genreSection: {
    marginBottom: 16,
  },
  genreTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 16,
    marginVertical: 8,
  },
});

export default HomeScreen;