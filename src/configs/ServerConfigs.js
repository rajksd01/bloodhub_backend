import * as dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;
const DB_PORT = process.env.MONGO_URI;
const SaltRounds = process.env.SALT_ROUNDS;
const tokenSecret = process.env.TOKEN_SECRET_KEY;
const nodemailer_user = process.env.NODEMAILER_USER;
const nodemailer_pass = process.env.NODEMAILER_PASS;
export {
  PORT,
  DB_PORT,
  SaltRounds,
  tokenSecret,
  nodemailer_pass,
  nodemailer_user,
};
