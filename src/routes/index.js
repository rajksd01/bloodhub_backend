import express from "express";
import userRoutes from "./v1/user-routes.js";

const router = express.Router();

router.use("/user", userRoutes);

export default router;
