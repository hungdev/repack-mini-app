import { configureStore } from '@reduxjs/toolkit'

import counterReducer from './counterSlice'
import fetchDemoSlice from './fetchDemoSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    fetchApiDemo: fetchDemoSlice,
  },
})
