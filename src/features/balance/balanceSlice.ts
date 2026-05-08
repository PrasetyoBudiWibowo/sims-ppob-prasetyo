import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import { getBalance } from "./balanceService";

interface BalanceState {
  balance: number;
  loading: boolean;
  error: string | null;
}

const initialState: BalanceState = {
  balance: 0,
  loading: false,
  error: null,
};

export const fetchBalance =
  createAsyncThunk(
    "balance/fetchBalance",
    async (_, thunkAPI) => {
      try {
        const response =
          await getBalance();

        return response.data.balance;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Gagal mengambil saldo"
        );
      }
    }
  );

const balanceSlice = createSlice({
  name: "balance",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(
        fetchBalance.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchBalance.fulfilled,
        (state, action) => {
          state.loading = false;
          state.balance =
            action.payload;
        }
      )

      .addCase(
        fetchBalance.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload as string;
        }
      );
  },
});

export default balanceSlice.reducer;