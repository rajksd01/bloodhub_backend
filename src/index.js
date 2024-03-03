import express from "express";
import { PORT } from "./configs/ServerConfigs.js";
import { getInformation } from "./controllers/index.js";
import connectionToDB from "./configs/db-config.js";
import apiRoutes from "./routes/index.js";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "https://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api", apiRoutes);

app.get("/", getInformation);

app.listen(PORT, () => {
  connectionToDB();
  console.log(`listening on ${PORT}`);
});
