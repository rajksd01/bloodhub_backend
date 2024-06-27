import jwt from "jsonwebtoken";
import conf from "../configs/ServerConfigs.js";

function createAccessToken(user) {
  const { name, email, role, _id } = user;
  const token = jwt.sign({ name, email, role, _id }, conf.accessTokenSecret, {
    expiresIn: "4h",
  });

  return token;
}

// referesh token
function createRefreshToken(user) {
  const { name, email, role, _id } = user;
  const token = jwt.sign({ name, email, role, _id }, conf.refreshTokenSecret, {
    expiresIn: "30d",
  });
  return token;
}

export { createAccessToken, createRefreshToken };
