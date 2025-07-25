
import axiosInstance from "../utils/axiosInstance";

export const createShortUrl = async({ url, customSlug }) => {
   const requestBody = { url }
   if (customSlug && customSlug.trim()) {
       requestBody.slug = customSlug.trim()  // Backend expects 'slug', not 'customSlug'
   }
   
   const { data } = await axiosInstance.post("/api/create", requestBody)
   return data.shortUrl;
}