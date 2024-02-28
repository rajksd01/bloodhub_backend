import * as dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;
const DB_PORT = process.env.MONGO_URI;
export { PORT, DB_PORT };
