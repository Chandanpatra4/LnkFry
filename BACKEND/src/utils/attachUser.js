import { findUserById } from "../dao/user.dao.js"
import { verifyToken } from "./helper.js"

export const attachUser = async (req, res, next) => {
    const token = req.cookies.accessToken
    console.log("AttachUser - Token from cookies:", token ? "Present" : "Missing");
    console.log("AttachUser - All cookies:", req.cookies);
    
    if (!token) return next()

    try {
        const decoded = verifyToken(token)
        const user = await findUserById(decoded)
        if (!user) {
            console.log("AttachUser - User not found for decoded token");
            return next()
        }
        req.user = user
        console.log("AttachUser - User attached:", user.email);
        next()
    } catch (error) {
        console.log("AttachUser - Error:", error.message)
        next()
    }
}