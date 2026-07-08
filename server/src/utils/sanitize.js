export const cleanText = (value = "") =>
  String(value).replace(/\s+/g, " ").trim();

export const cleanMessage = (value = "") =>
  String(value).replace(/\r\n/g, "\n").trim();
