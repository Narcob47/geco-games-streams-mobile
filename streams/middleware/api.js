import axios from 'axios';

const API_BASE_URL = 'https://geco-games-streams-backend.onrender.com/api/v1/test/'; // Replace with your actual API base URL

export const signUp = async (username, email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Sign up failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Sign up error:', error);
    throw error;
  }
};

export const signIn = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}users/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Sign in failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  }
};

export const handleWatchNow = async (navigation, seriesId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}content/${seriesId}/watch/`);
    const { stream_url } = response.data;

    if (stream_url) {
      navigation.navigate('Watch', { streamUrl: stream_url });
    } else {
      Alert.alert('Error', 'No stream URL found.');
    }
  } catch (error) {
    console.error('Error fetching stream URL:', error);
    Alert.alert('Error', 'Failed to fetch stream URL.');
  }
};

export const handleWatchMovieNow = async (navigation, movieId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}movies/${movieId}/watch/`);
    const { movie_upload } = response.data;

    if (movie_upload) {
      navigation.navigate('Watch', { movie_upload: movie_upload });
    } else {
      Alert.alert('Error', 'No stream URL found.');
    }
  } catch (error) {
    console.error('Error fetching stream URL:', error);
    Alert.alert('Error', 'Failed to fetch stream URL.');
  }
};

export const fetchMovies = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}movies/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const fetchSeries = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}content/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching series:', error);
    throw error;
  }
}