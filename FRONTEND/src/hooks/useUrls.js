import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axiosInstance from '../utils/axiosInstance'

// API functions
const fetchUserUrls = async () => {
  const { data } = await axiosInstance.get('/api/urls')
  return data.urls || data
}

const deleteUrl = async (urlId) => {
  const { data } = await axiosInstance.delete(`/api/urls/${urlId}`)
  return data
}

// Custom hooks
export const useUserUrls = () => {
  return useQuery({
    queryKey: ['userUrls'],
    queryFn: fetchUserUrls,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  })
}

export const useDeleteUrl = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: deleteUrl,
    onSuccess: () => {
      // Invalidate and refetch user URLs after deletion
      queryClient.invalidateQueries({ queryKey: ['userUrls'] })
    },
    onError: (error) => {
      console.error('Error deleting URL:', error)
    }
  })
}

export const useCreateShortUrl = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ url }) => {
      const { data } = await axiosInstance.post('/api/create', { url })
      return data.shortUrl || data
    },
    onSuccess: () => {
      // Invalidate and refetch user URLs after creation
      queryClient.invalidateQueries({ queryKey: ['userUrls'] })
    },
    onError: (error) => {
      console.error('Error creating short URL:', error)
    }
  })
}
