import validator from "validator";
import { ContactMessage } from "../models/ContactMessage.js";
import { sendContactEmail } from "../services/mail.service.js";
import { AppError } from "../utils/AppError.js";
import { cleanMessage, cleanText } from "../utils/sanitize.js";

export const createContactMessage = async (req, res) => {
  const name = cleanText(req.body.name);
  const email = cleanText(req.body.email).toLowerCase();
  const message = cleanMessage(req.body.message);

  if (!name || !email || !message) {
    throw new AppError("Name, email, and message are required.", 400);
  }

  if (name.length > 120) {
    throw new AppError("Name must be 120 characters or fewer.", 400);
  }

  if (email.length > 254) {
    throw new AppError("Email must be 254 characters or fewer.", 400);
  }

  if (message.length > 5000) {
    throw new AppError("Message must be 5000 characters or fewer.", 400);
  }

  const emailLooksValid = validator.isEmail(email);
  const contactMessage = await ContactMessage.create({
    name,
    email,
    message,
    emailLooksValid,
  });

  const delivery = await sendContactEmail({ name, email, message });
  contactMessage.deliveryMode = delivery.deliveryMode;
  contactMessage.emailLooksValid = delivery.emailLooksValid;
  await contactMessage.save();

  res.status(201).json({
    message: "Message sent successfully.",
  });
};
