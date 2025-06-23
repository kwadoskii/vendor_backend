import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 2, maxlength: 100, trim: true },
    addressLine1: { type: String, required: true, minlength: 5, maxlength: 150, trim: true },
    addressLine2: { type: String, maxlength: 150, trim: true },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      required: true,
    },
    state: {
      type: mongoose.Schema.Types.Mixed,
      ref: "State",
      required: true,
      validate: {
        validator: function (value) {
          return (
            mongoose.Types.ObjectId.isValid(value) ||
            (typeof value === "string" && value.trim().length > 0)
          );
        },
        message: (props) => `"${props.value}" must be a valid state ObjectId or non-empty string`,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 100,
      trim: true,
      lowercase: true,
    },
    altEmail: { type: String, minlength: 5, maxlength: 100, trim: true, lowercase: true },
    serviceType: { type: mongoose.Schema.Types.ObjectId, ref: "ServiceType", required: true },
    contactFullName: { type: String, required: true, minlength: 2, maxlength: 100, trim: true },
    contactPhoneNumber: { type: String, required: true, minlength: 7, maxlength: 20, trim: true },
    contactEmail: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 100,
      trim: true,
      lowercase: true,
    },
    status: { type: Boolean, required: true, default: true },
  },
  {
    timestamps: true,
  }
);

const Vendor = mongoose.model("Vendor", vendorSchema);

export default Vendor;
