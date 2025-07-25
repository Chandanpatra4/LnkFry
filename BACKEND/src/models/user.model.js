import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false, // Exclude password from queries by default
    },
    avatar: {
        type: String,
        required: false,
        default: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp"
    },

});

userSchema.methods.comparePassword = async function (password) {
   return await bcrypt.compare(password, this.password);
}

userSchema.set("toJSON", {
    transform: function (doc, ret) {
        delete ret.__v;
        delete ret.password; // Exclude password from JSON output
        return ret;
    }
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    // Here you would typically hash the password before saving
    this.password = await bcrypt.hash(this.password, 10); 
    next();
})

const User = mongoose.model("User", userSchema);
export default User;