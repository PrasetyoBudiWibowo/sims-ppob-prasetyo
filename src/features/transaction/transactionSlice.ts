import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import { createTransaction } from "./transactionService";

export const transactionPayment =
  createAsyncThunk(
    "transaction/payment",

    async (
      payload: { service_code: string },
      thunkAPI,
    ) => {
      try {
        return await createTransaction(
          payload,
        );
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Transaksi gagal",
        );
      }
    },
  );

interface TransactionState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: TransactionState =
  {
    loading: false,
    success: false,
    error: null,
  };

const transactionSlice = createSlice({
  name: "transaction",

  initialState,

  reducers: {
    resetTransactionState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(
        transactionPayment.pending,
        (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        },
      )

      .addCase(
        transactionPayment.fulfilled,
        (state) => {
          state.loading = false;
          state.success = true;
        },
      )

      .addCase(
        transactionPayment.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;

          state.error =
            action.payload as string;
        },
      );
  },
});

export const {
  resetTransactionState,
} = transactionSlice.actions;

export default transactionSlice.reducer;