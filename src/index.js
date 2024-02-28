import express from "express";
import { PORT } from "./configs/ServerConfigs.js";
import { getInformation } from "./controllers/index.js";

const app = express();

app.get("/", getInformation);

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
