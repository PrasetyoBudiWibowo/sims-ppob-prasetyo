import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface TopUpState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: TopUpState = {
  loading: false,
  success: false,
  error: null,
};

const topupSlice = createSlice({
  name: "topup",
  initialState,

  reducers: {
    topUpStart: (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },

    topUpSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },

    topUpFailure: (
      state,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },

    resetTopUpState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
});

export const {
  topUpStart,
  topUpSuccess,
  topUpFailure,
  resetTopUpState,
} = topupSlice.actions;

export default topupSlice.reducer;