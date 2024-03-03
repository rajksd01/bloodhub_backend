import express from "express";
import {
  createBloodRequest,
  getAllBloodRequest,
} from "../../controllers/index.js";
const router = express.Router();

router.post("/createBloodRequest", createBloodRequest);
router.get("/", getAllBloodRequest);

export default router;
