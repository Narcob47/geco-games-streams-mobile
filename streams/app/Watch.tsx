import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Video } from 'expo-av';
import { useRoute } from '@react-navigation/native';

const WatchScreen = () => {
  const videoRef = React.useRef(null);
  const route = useRoute<{ key: string; name: string; params: { streamUrl: string } }>();
  const { streamUrl } = route.params;

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={{ uri: streamUrl }} // Get video URL from HomeScreen
        style={styles.video}
        useNativeControls
        shouldPlay
        isLooping
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    height: 300, // Adjust as needed
  },
});

export default WatchScreen;