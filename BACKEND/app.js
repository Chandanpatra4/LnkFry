import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectDB from './src/config/mongo.config.js';
import short_url from './src/routes/short_url.route.js';
import auth_routes from './src/routes/auth.routes.js';
import user_routes from './src/routes/user.routes.js';
import { redirectFromShortUrl } from './src/controller/short_url.controller.js';
import { attachUser } from './src/utils/attachUser.js';
import { errorHandler } from './src/utils/errorHandler.js';

dotenv.config(); // Loads variables from .env

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
const allowedOrigins = [
  "http://localhost:5173",
  "https://lnk-fry.vercel.app" 
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(attachUser); // ✅ Attach user from JWT in cookies

// Routes
app.use("/api/user", user_routes);
app.use("/api/auth", auth_routes);
app.use("/api/create", short_url);
app.get("/:id", redirectFromShortUrl);


// // Optional: Debug route to test user attachment
// app.get("/api/check-user", (req, res) => {
//     if (req.user) {
//         res.json({ user: req.user });
//     } else {
//         res.status(401).json({ message: "User not attached" });
//     }
// });

// Error handler (should be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
