import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice.js'
import urlReducer from './slices/urlSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    url: urlReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})
