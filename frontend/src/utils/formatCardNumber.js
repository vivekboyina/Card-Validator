// "41111111abc" -> "4111 1111"
// Keeps digits only, allows at most 19 digits, adds a space after every 4.
export function formatCardNumber(raw) {
  const digits = raw.replace(/\D/g, "").slice(0, 19);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}
