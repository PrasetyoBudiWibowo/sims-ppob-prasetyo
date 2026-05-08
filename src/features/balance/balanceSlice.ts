import { createSlice } from "@reduxjs/toolkit";

interface BalanceState {
  balance: number;
}

const initialState: BalanceState = {
  balance: 0,
};

const balanceSlice = createSlice({
  name: "balance",
  initialState,

  reducers: {
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
  },
});

export const { setBalance } =
  balanceSlice.actions;

export default balanceSlice.reducer;