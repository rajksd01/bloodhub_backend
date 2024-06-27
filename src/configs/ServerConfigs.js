import * as dotenv from "dotenv";
dotenv.config();
const _config = {
  PORT: process.env.PORT,
  DB_PORT: process.env.MONGO_URI,
  SaltRounds: process.env.SALT_ROUNDS,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET_KEY,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET_KEY,
  nodemailer_user: process.env.NODEMAILER_USER,
  nodemailer_pass: process.env.NODEMAILER_PASS,
};
const conf = Object.freeze(_config);
export default conf;
