import { generateNanoId } from "../utils/helper.js"
import urlSchema from '../models/short_url.model.js'
import { saveShortUrl } from "../dao/short_url.js";


export const createShortUrlWithOutUserService = async (url) => {
    const shortUrl = await  generateNanoId(7);
    await saveShortUrl(shortUrl, url);
    return shortUrl;
}

export const createShortUrlWithUserService = async (url,userId) => {
    const shortUrl = await  generateNanoId(7);
    await saveShortUrl(url,shortUrl, userId);
    return shortUrl;
}