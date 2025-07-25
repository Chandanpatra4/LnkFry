import { createAsyncThunk } from '@reduxjs/toolkit'
import { loginUser, registerUser, logoutUser } from '../../api/user.api'
import {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logout,
} from '../slices/authSlice'

// Login thunk
export const loginUserThunk = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(loginStart())
      const response = await loginUser(password, email)
      
      // Store token in localStorage
      if (response.token) {
        localStorage.setItem('token', response.token)
        localStorage.setItem('user', JSON.stringify(response.user))
      }
      
      dispatch(loginSuccess({
        user: response.user,
        token: response.token
      }))
      
      return response
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed'
      dispatch(loginFailure(errorMessage))
      return rejectWithValue(errorMessage)
    }
  }
)

// Register thunk
export const registerUserThunk = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(registerStart())
      const response = await registerUser(name, email, password)
      
      dispatch(registerSuccess(response))
      
      return response
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed'
      dispatch(registerFailure(errorMessage))
      return rejectWithValue(errorMessage)
    }
  }
)

// Logout thunk
export const logoutUserThunk = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await logoutUser()
      
      // Clear localStorage
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      
      dispatch(logout())
      
      return true
    } catch (error) {
      // Even if API call fails, we should still logout locally
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      dispatch(logout())
      
      return true
    }
  }
)

// Initialize auth from localStorage
export const initializeAuth = createAsyncThunk(
  'auth/initialize',
  async (_, { dispatch }) => {
    try {
      const token = localStorage.getItem('token')
      const userStr = localStorage.getItem('user')
      
      if (token && userStr) {
        const user = JSON.parse(userStr)
        dispatch(loginSuccess({ user, token }))
        return { user, token }
      }
      
      return null
    } catch (error) {
      // Clear invalid data
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      return null
    }
  }
)
