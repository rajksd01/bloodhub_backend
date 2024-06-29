import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "../configs/ServerConfigs.js";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  refreshToken: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
    ENUM: ["user", "admin", "moderator"],
  },
});

userSchema.pre("save", function () {
  const encrypted_password = bcrypt.hash(this.password, +config.SaltRounds);
  if (encrypted_password.length > 0) {
    this.password = encrypted_password;
  } else {
    console.log("cannot hash password");
  }
});

const User = mongoose.model("User", userSchema);

export default User;
