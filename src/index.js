import express from "express";
import { PORT } from "./configs/ServerConfigs.js";
import { getInformation } from "./controllers/index.js";
import connectionToDB from "./configs/db-config.js";

const app = express();

app.get("/", getInformation);

app.listen(PORT, () => {
  connectionToDB();
  console.log(`listening on ${PORT}`);
});
