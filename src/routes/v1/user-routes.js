import express from "express";
import { createUser, signIn } from "../../controllers/index.js";
const router = express.Router();

router.post("/signup", createUser);
router.post("/login", signIn);

export default router;
