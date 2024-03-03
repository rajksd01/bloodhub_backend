import express from "express";
import userRoutes from "./v1/user-routes.js";
import bloodRequestRoutes from "./v1/bloodRequest-routes.js";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/bloodRequest", bloodRequestRoutes);

export default router;
