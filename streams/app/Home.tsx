import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, ScrollView, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { fetchSeries, handleWatchNow } from '../middleware/api';
import { fetchMovies, handleWatchMovieNow } from '../middleware/api';

const HomeScreen: React.FC = () => {
  interface Series {
    id: string;
    stream_url: string;
    title: string;
    descriptions: string;
    age_rating: string;
    category: string;
    duration: string;
    genres: string;
  }

  interface Movies {
    id: string;
    stream_url: string;
    title: string;
    descriptions: string;
    age_rating: string;
    category: string;
    duration: string;
    genres: string;
  }
  
  const [series, setSeries] = useState<Series[]>([]);
  const [movie, setMovies] = useState<Movies[]>([]);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSeries();
        setSeries(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMovies();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchData();
  }, []);

  const handleWatchNowClick = (seriesId: string) => {
    handleWatchNow(navigation, seriesId);
  };

  const handleWatchMovieNowClick = (movieId: string) => {
    handleWatchMovieNow(navigation, movieId);
  };

  const renderSeriesItem = ({ item }: any) => (
    <View style={styles.movieCard}>
      <Image source={{ uri: item.stream_url }} style={styles.movieImage} />
      <View style={styles.movieInfo}>
        <Text style={styles.movieTitle}>{item.title}</Text>
        {/* <Text style={styles.movieDescription}>{item.descriptions}</Text> */}
        <Text style={styles.movieDetails}>{item.age_rating} | {item.category} | {item.duration}</Text>
        <Text style={styles.movieGenres}>{item.genres}</Text>
        <TouchableOpacity style={styles.watchButton} onPress={() => handleWatchNowClick(item.id)}>
          <Text style={styles.watchButtonText}>Watch now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderMovieItem = ({ item }: any) => (
    <View style={styles.movieCard}>
      <Image source={{ uri: item.image }} style={styles.movieImage} />
      <View style={styles.movieInfo}>
        <Text style={styles.movieTitle}>{item.title}</Text>
        <Text style={styles.release}>{item.release_date}</Text>
        {/* <Text style={styles.movieDescription}>{item.description}</Text> */}
        
        <Text style={styles.movieDetails}>{item.age_rating} | {item.category} | {item.duration}</Text>
        <Text style={styles.movieGenres}>{item.genre}</Text>
        <TouchableOpacity style={styles.watchButton} onPress={() => handleWatchMovieNowClick(item.id)}>
          <Text style={styles.watchButtonText}>Watch now</Text>
        </TouchableOpacity>
      </View>
    </View>
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

        <Text style={styles.sectionTitle}>Series</Text>

        <FlatList
          data={series}
          renderItem={renderSeriesItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          contentContainerStyle={styles.movieList}
          showsHorizontalScrollIndicator={false}
        />
        <Text style={styles.sectionTitle}>Movies</Text>
        <FlatList
          data={movie}
          renderItem={renderMovieItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          contentContainerStyle={styles.movieList}
          showsHorizontalScrollIndicator={false}
        />
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
    height: 215,
    justifyContent: 'flex-end',
  },
  movieInfoContainer: {
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  releaseDate: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 3,
  },
  genre: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 16,
  },
  release: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 16,
  },
  movieTitle: {
    color: '#FFFFFF',
    fontSize: 24,
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
    marginTop: 8,
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
  movieList: {
    padding: 16,
  },
  movieCard: {
    marginRight: 16,
    width: 150,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#2C2C2E',
  },
  movieImage: {
    width: '100%',
    height: 150,
  },
  movieInfo: {
    padding: 8,
  },
  movieDescription: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  movieDetails: {
    color: '#AAAAAA',
    fontSize: 12,
    marginVertical: 4,
  },
  movieGenres: {
    color: '#AAAAAA',
    fontSize: 12,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
    marginVertical: 8,
  },
});

export default HomeScreen;
