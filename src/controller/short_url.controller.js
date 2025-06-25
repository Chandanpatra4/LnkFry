import { getshortUrl } from "../dao/short_url.js"
import { createShortUrlWithOutUserService } from "../services/short_url.service.js"
import { generateNanoId } from "../utils/helper.js"

export const createShortUrl = async (req, res) => {

    const { url } = req.body
    const shortUrl = await createShortUrlWithOutUserService(url)
    res.send(process.env.APP_URL + shortUrl)

}

export const redirectFromShortUrl = async (req, res) => {
    const { id } = req.params;
    const url = await getshortUrl(id);
    res.redirect(url.full_url);
}