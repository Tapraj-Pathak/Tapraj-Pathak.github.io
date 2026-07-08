import nodemailer from "nodemailer";
import validator from "validator";
import { env } from "../config/env.js";

const requiredMailConfig = [
  ["PRIMARY_EMAIL", env.primaryEmail],
  ["SECONDARY_EMAIL", env.secondaryEmail],
  ["SMTP_HOST", env.smtp.host],
  ["SMTP_USER", env.smtp.user],
  ["SMTP_PASS", env.smtp.pass],
];

const getTransporter = () => {
  const missing = requiredMailConfig
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    throw new Error(`Missing email config: ${missing.join(", ")}`);
  }

  return nodemailer.createTransport({
    host: env.smtp.host,
    port: env.smtp.port,
    secure: env.smtp.secure,
    auth: {
      user: env.smtp.user,
      pass: env.smtp.pass,
    },
  });
};

const formatMailbox = (name, email) => `"${name.replace(/"/g, "")}" <${email}>`;

export const sendContactEmail = async ({ name, email, message }) => {
  const transporter = getTransporter();
  const emailLooksValid = validator.isEmail(email);
  const canUseVisitorFrom = env.allowVisitorFrom && emailLooksValid;
  const from = canUseVisitorFrom
    ? formatMailbox(name, email)
    : formatMailbox("tapraj.dev contact", env.secondaryEmail);

  const subject = canUseVisitorFrom
    ? name
    : `${name} - ${emailLooksValid ? email : "invalid email: " + email}`;

  const text = [
    message,
    "",
    "---",
    `Name: ${name}`,
    `Email: ${email}`,
    `Email syntax valid: ${emailLooksValid ? "yes" : "no"}`,
  ].join("\n");

  await transporter.sendMail({
    from,
    to: env.primaryEmail,
    replyTo: emailLooksValid ? email : env.secondaryEmail,
    subject,
    text,
  });

  return {
    emailLooksValid,
    deliveryMode: canUseVisitorFrom ? "visitor-from" : "secondary-from",
  };
};
