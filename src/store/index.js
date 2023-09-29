/* eslint-disable prettier/prettier */
import { configureStore } from '@reduxjs/toolkit';

import $auth from './auth';
import bottomNav from './bottomNav';

const store = configureStore({
  reducer: {
    $auth: $auth.reducer,
    bottomNav: bottomNav,
  },
});

export default store;
