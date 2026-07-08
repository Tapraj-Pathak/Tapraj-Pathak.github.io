import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 254,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },
    emailLooksValid: {
      type: Boolean,
      default: false,
    },
    deliveryMode: {
      type: String,
      enum: ["visitor-from", "secondary-from"],
      default: "secondary-from",
    },
  },
  { timestamps: true },
);

export const ContactMessage = mongoose.model(
  "ContactMessage",
  contactMessageSchema,
);
