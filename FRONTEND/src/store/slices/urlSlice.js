import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  urls: [],
  currentUrl: null,
  loading: false,
  error: null,
  totalUrls: 0,
}

const urlSlice = createSlice({
  name: 'url',
  initialState,
  reducers: {
    // Create Short URL
    createUrlStart: (state) => {
      state.loading = true
      state.error = null
    },
    createUrlSuccess: (state, action) => {
      state.loading = false
      state.currentUrl = action.payload
      state.urls.unshift(action.payload) // Add to beginning of array
      state.totalUrls += 1
      state.error = null
    },
    createUrlFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    
    // Get User URLs
    getUserUrlsStart: (state) => {
      state.loading = true
      state.error = null
    },
    getUserUrlsSuccess: (state, action) => {
      state.loading = false
      state.urls = action.payload.urls
      state.totalUrls = action.payload.total
      state.error = null
    },
    getUserUrlsFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    
    // Delete URL
    deleteUrlStart: (state) => {
      state.loading = true
      state.error = null
    },
    deleteUrlSuccess: (state, action) => {
      state.loading = false
      state.urls = state.urls.filter(url => url.id !== action.payload)
      state.totalUrls -= 1
      state.error = null
    },
    deleteUrlFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    
    // Clear current URL
    clearCurrentUrl: (state) => {
      state.currentUrl = null
    },
    
    // Clear error
    clearError: (state) => {
      state.error = null
    },
    
    // Clear all URLs (for logout)
    clearUrls: (state) => {
      state.urls = []
      state.currentUrl = null
      state.totalUrls = 0
      state.error = null
    },
  },
})

export const {
  createUrlStart,
  createUrlSuccess,
  createUrlFailure,
  getUserUrlsStart,
  getUserUrlsSuccess,
  getUserUrlsFailure,
  deleteUrlStart,
  deleteUrlSuccess,
  deleteUrlFailure,
  clearCurrentUrl,
  clearError,
  clearUrls,
} = urlSlice.actions

export default urlSlice.reducer
