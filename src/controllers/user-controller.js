import bcrypt from "bcrypt";
import { User } from "../models/index.js";
import { createAccessToken, createRefreshToken } from "../middlewares/auth.js";
import jwt from "jsonwebtoken";
import conf from "../configs/ServerConfigs.js";

// TO CREATE USER
const createUser = async (req, res) => {
  try {
    let user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      contactNumber: req.body.contactNumber,
      location: req.body.location,
      pincode: req.body.pincode,
    });
    if (req.body.role) {
      user.role = req.body.role;
    }
    // SuccessResponse.data = user;
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    // ErrorResponse.error = error;
    res.status(400).send(error);
  }
};

// TO SIGNIN USER
async function signIn(req, res) {
  try {
    if (req.body) {
      const user = await User.findOne({ email: req.body.email }).lean();
      if (!user) {
        return res.status(400).send({ error: "User not found" });
      }
      const isPasswordMatched = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordMatched) {
        return res.status(400).send({ error: "Bad Credentials" });
      }
      const { password, ...userOut } = user;
      const accesstoken = createAccessToken(userOut);
      const refreshToken = createRefreshToken(userOut);
      user.refreshToken = refreshToken;
      await User.updateOne(
        { email: req.body.email },
        { refreshToken: refreshToken }
      );

      const options = {
        httpOnly: true,
        secure: true,
      };

      return res
        .status(200)
        .cookie("accessToken", accesstoken, options)
        .cookie("refreshToken", refreshToken, options)
        .send({
          user: userOut,
          accessToken: accesstoken,
        });
    }
  } catch (error) {
    console.log(error);
    res.status(502).send({
      message: "Couldn't Verify User , Bad Credentials",
      error: error,
    });
  }
}

// to refresh the access token

const refreshAccessToken = async (req, res) => {
  const userRefreshToken = req.cookies.refreshToken;
  if (!userRefreshToken) {
    return res.status(401).send({ error: "User not authenticated" });
  }

  try {
    const decodedToken = jwt.verify(userRefreshToken, conf.refreshTokenSecret);
    const user = await User.findOne({ _id: decodedToken?._id }).lean();
    if (!user) {
      return res.status(400).send({ error: "Token not valid" });
    }
    if (userRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }
    const options = {
      httpOnly: true,
      secure: true,
    };
    const { password, ...userOut } = user;
    const accessToken = createAccessToken(userOut);
    const newRefreshToken = createRefreshToken(userOut);
    await User.updateOne({ _id: user._id }, { refreshToken: newRefreshToken });
    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json({ accessToken: accessToken, messaage: "Token Refreshed" });
  } catch (error) {
    console.log(error);
    res.status(502).send({
      message: "Invalid  Token",
      error: error,
    });
  }
};

export { createUser, signIn, refreshAccessToken };
