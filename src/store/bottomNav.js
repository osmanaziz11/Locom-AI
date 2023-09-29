/* eslint-disable prettier/prettier */

import { createSlice } from '@reduxjs/toolkit';

export const navSlice = createSlice({
  name: 'bottomNav',

  initialState: {
    isActive: true,
  },
  reducers: {
    navActive: (state, { payload }) => {
      state.isActive = payload;
    },
  },
});

export const { navActive } = navSlice.actions;

export default navSlice.reducer;
