import mongoose from "mongoose";
import { BloodENUM } from "../utils/common/index.js";

const bloodRequestSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  requestorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  requestorName:{
    type: String,
    required: true,
  },
  requestorEmail:{
    type: String,
    required: true,
  },
  requestorContactNumber:{
    type: String,
    required: true,
  },
  bloodType: {
    type: String,
    enum: BloodENUM,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  status: {
    type: String,
    enum: ["Pending", "Successful", "Failed"],
    default: "Pending",
    required: true,
  },
  referenceDocument: {
    data: Buffer,
    contentType: String,
  },
  specialInstructions:{
    type:String,
    
  }
});

const BloodRequest = mongoose.model("BloodRequest", bloodRequestSchema);

export default BloodRequest;
