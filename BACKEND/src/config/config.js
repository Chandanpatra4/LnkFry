export const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    sameSite: process.env.NODE_ENV === 'production' ? "None" : "Lax", // Important for cross-origin
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    domain: process.env.NODE_ENV === 'production' ? undefined : undefined // Let browser handle domain
}