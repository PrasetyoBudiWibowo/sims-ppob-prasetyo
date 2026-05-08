import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getServices } from "./serviceService";

interface ServiceState {
  data: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ServiceState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchServices = createAsyncThunk(
  "service/fetchServices",
  async (_, thunkAPI) => {
    try {
      return await getServices();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Gagal mengambil layanan",
      );
    }
  },
);

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })

      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default serviceSlice.reducer;