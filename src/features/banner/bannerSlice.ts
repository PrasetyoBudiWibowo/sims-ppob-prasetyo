import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBanners } from "./bannerService";

interface BannerState {
  data: any[];
  loading: boolean;
  error: string | null;
}

const initialState: BannerState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchBanners = createAsyncThunk(
  "banner/fetchBanners",
  async (_, thunkAPI) => {
    try {
      return await getBanners();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Gagal mengambil banner",
      );
    }
  },
);

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })

      .addCase(fetchBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default bannerSlice.reducer;