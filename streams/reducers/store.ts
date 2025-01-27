import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useOnboardingStore = create((set) => ({
  isOnboardingCompleted: false,
  initializeOnboarding: async () => {
    const status = await AsyncStorage.getItem('onboardingCompleted');
    set({ isOnboardingCompleted: status === 'true' });
  },
  completeOnboarding: async () => {
    await AsyncStorage.setItem('onboardingCompleted', 'true');
    set({ isOnboardingCompleted: true });
  },
}));

export default useOnboardingStore;
