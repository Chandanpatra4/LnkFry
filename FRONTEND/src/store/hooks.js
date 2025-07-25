import { useSelector, useDispatch } from 'react-redux'

// Custom hook to get auth state
export const useAuth = () => {
  return useSelector((state) => state.auth)
}

// Custom hook to get URL state
export const useUrl = () => {
  return useSelector((state) => state.url)
}

// Custom hook for dispatch
export const useAppDispatch = () => {
  return useDispatch()
}

// Specific auth selectors
export const useIsAuthenticated = () => {
  return useSelector((state) => state.auth.isAuthenticated)
}

export const useCurrentUser = () => {
  return useSelector((state) => state.auth.user)
}

export const useAuthLoading = () => {
  return useSelector((state) => state.auth.loading)
}

export const useAuthError = () => {
  return useSelector((state) => state.auth.error)
}

// Specific URL selectors
export const useUrls = () => {
  return useSelector((state) => state.url.urls)
}

export const useCurrentUrl = () => {
  return useSelector((state) => state.url.currentUrl)
}

export const useUrlLoading = () => {
  return useSelector((state) => state.url.loading)
}

export const useUrlError = () => {
  return useSelector((state) => state.url.error)
}
