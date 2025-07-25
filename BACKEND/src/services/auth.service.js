import jsonwebtoken from "jsonwebtoken"
import User from "../models/user.model.js";
import { createUser, findUserByEmail, findUserByEmailBypassword } from "../dao/user.dao.js";
import { ConflictError } from "../utils/errorHandler.js";
import { signToken } from "../utils/helper.js";

export const registerUser = async (name, email, password) => {
    const user = await findUserByEmail(email)
    if (user) throw new ConflictError("User already exists")
    const newUser = await createUser(name, email, password)
    const token = await signToken({ id: newUser._id })
    return { token, user }
}

export const loginUser = async (email, password) => {
    const user = await findUserByEmailBypassword(email);
    if (!user) throw new Error("Invalid credentials")
    const ispasswordValid = await user.comparePassword(password)
    if (!ispasswordValid) throw new Error("Invalid credentials")
    const token = signToken({ id: user._id });
    return { token, user }
}
