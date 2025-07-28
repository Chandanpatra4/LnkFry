import { findUserById } from "../dao/user.dao.js"
import { verifyToken } from "./helper.js"

export const attachUser = async (req, res, next) => {
    let token = req.cookies.accessToken;
    
    // If no cookie token, check Authorization header
    if (!token) {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7);
        }
    }
    
    
    
    if (!token) return next()

    try {
        const decoded = verifyToken(token)
        const user = await findUserById(decoded)
        if (!user) {
            console.log("AttachUser - User not found for decoded token");
            return next()
        }
        req.user = user
    
        next()
    } catch (error) {
        console.log("AttachUser - Error:", error.message)
        next()
    }
}