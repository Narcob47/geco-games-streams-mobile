import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Alert } from 'react-native';

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await fetch('/users/login/', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      Alert.alert('Error', 'Failed to sign in. Please check your credentials and try again.');
      return rejectWithValue(error.message);
    }
  }
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({ username, password, name }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.BASE_URL}/users/signup/`, { username, password, name });
      return response.data;
    } catch (error) {
      Alert.alert('Error', 'Failed to sign up. Please try again.');
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      state.token = null;
    },
    signIn: (state, action) => {
      // handle sign in
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { signOut } = authSlice.actions;

export default authSlice.reducer;