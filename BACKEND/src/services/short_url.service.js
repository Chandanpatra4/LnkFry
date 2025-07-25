import { generateNanoId } from "../utils/helper.js"
import urlSchema from '../models/short_url.model.js'
import { getCustomShortUrl, saveShortUrl } from "../dao/short_url.js";


export const createShortUrlWithOutUserService = async (url) => {
    const shortUrl =   generateNanoId(7);
    if(!shortUrl) throw new Error("Failed to generate short URL");
    await saveShortUrl(shortUrl, url);
    return shortUrl;
}

export const createShortUrlWithUserService = async (url,userId,slug = null) => {
    const shortUrl = slug || generateNanoId(7);
    const exists = await getCustomShortUrl(slug);
    if (exists) throw new Error("This Custom short URL already exists");
    await saveShortUrl(shortUrl,url, userId);
    return shortUrl;
}



