import { nanoid } from "nanoid"
import jsonwebtoken from "jsonwebtoken"
import { cookieOptions } from "../config/config.js";

export const generateNanoId = (length) => {
    return nanoid(length);
}

export const  signToken = (payload) =>{
    return jsonwebtoken.sign(payload, process.env.JWT_SECRET, {expiresIn: "7d"}) // 7 days to match cookie
}

export const verifyToken =(token) =>{
    const decoded =  jsonwebtoken.verify(token,process.env.JWT_SECRET)
    return decoded.id;
}