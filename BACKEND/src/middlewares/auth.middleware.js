import { findUserById } from "../dao/user.dao.js";
import { verifyToken } from "../utils/helper.js";

//complete it
export const authMiddleware = async (req,res,next) => {
    let token = req.cookies.accessToken;
    
    // If no cookie token, check Authorization header
    if (!token) {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7);
        }
    }
    
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    
    try {
        const decoded = verifyToken(token)
        const user = await findUserById(decoded);
        if (!user) return res.status(401).json({ message: "Unauthorized" });
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}
