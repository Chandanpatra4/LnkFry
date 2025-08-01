export const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    sameSite: process.env.NODE_ENV === 'production' ? "None" : "Lax", // Important for cross-origin
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    path: '/', // Ensure cookie is available for all paths
}