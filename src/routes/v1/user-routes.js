import express from "express";
import { createUser, signIn } from "../../controllers/index.js";
import { refreshAccessToken } from "../../controllers/user-controller.js";
const router = express.Router();

router.post("/signup", createUser);
router.post("/login", signIn);
router.get("/refreshToken", refreshAccessToken);

export default router;
