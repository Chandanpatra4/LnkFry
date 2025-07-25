import { createAsyncThunk } from '@reduxjs/toolkit'
import { createShortUrl } from '../../api/shortUrl.api'
import {
  createUrlStart,
  createUrlSuccess,
  createUrlFailure,
  getUserUrlsStart,
  getUserUrlsSuccess,
  getUserUrlsFailure,
} from '../slices/urlSlice'

// Create short URL thunk
export const createShortUrlThunk = createAsyncThunk(
  'url/createShortUrl',
  async (originalUrl, { dispatch, rejectWithValue }) => {
    try {
      dispatch(createUrlStart())
      const response = await createShortUrl(originalUrl)
      
      dispatch(createUrlSuccess(response))
      
      return response
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to create short URL'
      dispatch(createUrlFailure(errorMessage))
      return rejectWithValue(errorMessage)
    }
  }
)

// Get user URLs thunk (you'll need to create this API function)
export const getUserUrlsThunk = createAsyncThunk(
  'url/getUserUrls',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(getUserUrlsStart())
      
      // You'll need to create this API function
      // const response = await getUserUrls()
      
      // For now, returning mock data
      const response = {
        urls: [],
        total: 0
      }
      
      dispatch(getUserUrlsSuccess(response))
      
      return response
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch URLs'
      dispatch(getUserUrlsFailure(errorMessage))
      return rejectWithValue(errorMessage)
    }
  }
)
