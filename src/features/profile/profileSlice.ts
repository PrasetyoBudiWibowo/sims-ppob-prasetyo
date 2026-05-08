import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProfile } from './profileService';
import type { ProfileData } from './profileService';

interface ProfileState {
  data: ProfileData | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getProfile();
      if (response.status === 0) {
        return response.data;
      }
      return rejectWithValue(response.message || 'Gagal mengambil profile');
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Terjadi kesalahan');
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;