import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;

const serviceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 100,
      trim: true,
    },
    providedBy: {
      type: Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Service", serviceSchema);
