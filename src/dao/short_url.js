import urlSchema from '../models/short_url.model.js'

export const saveShortUrl = async (shortUrl, longUrl, userId) => {

    const newUrl = new urlSchema({
        full_url: longUrl,
        short_url: shortUrl
    })
    if(userId){
        newUrl.user_id = userId
    }
    newUrl.save()
}

export const getshortUrl = async (shortUrl) =>{
    return await urlSchema.findOne({short_url:shortUrl})
}