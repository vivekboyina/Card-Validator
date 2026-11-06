// Netlify Function port of backend/app.py + validator.py so the deployed
// site can validate cards without a separately hosted Flask server.
// Logic mirrors the Python backend exactly.

export default async (req: Request) => {
  const cleanNumber = (raw: string) => raw.replace(/ /g, "").replace(/-/g, "");
  const isDigits = (s: string) => /^[0-9]+$/.test(s);

  const isLuhnValid = (number: string) => {
    if (!isDigits(number)) return false;
    let total = 0;
    [...number].reverse().forEach((char, position) => {
      let digit = Number(char);
      if (position % 2 === 1) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      total += digit;
    });
    return total % 10 === 0;
  };

  const getCardType = (number: string) => {
    if (!isDigits(number)) return "Unknown";
    const length = number.length;
    if (number.startsWith("4") && [13, 16, 19].includes(length)) return "Visa";
    if (length === 16) {
      const firstTwo = Number(number.slice(0, 2));
      const firstFour = Number(number.slice(0, 4));
      if ((firstTwo >= 51 && firstTwo <= 55) || (firstFour >= 2221 && firstFour <= 2720)) {
        return "Mastercard";
      }
    }
    return "Unknown";
  };

  const maskNumber = (number: string) =>
    number.length <= 4 ? "*".repeat(number.length) : "*".repeat(number.length - 4) + number.slice(-4);

  const result = (valid: boolean, card_type: string, masked: string, message: string) =>
    ({ valid, card_type, masked, message });

  let data: any = null;
  try {
    data = await req.json();
  } catch {
    data = null;
  }

  if (!data || typeof data !== "object" || typeof data.card_number !== "string") {
    return Response.json({ error: "card_number (text) is required." }, { status: 400 });
  }

  // Note: the card number is never logged or stored.
  const number = cleanNumber(data.card_number);

  if (!isDigits(number)) {
    return Response.json(result(false, "Unknown", "", "Use digits, spaces or dashes only."));
  }
  if (number.length < 13 || number.length > 19) {
    return Response.json(result(false, "Unknown", "", "Card number must be 13 to 19 digits."));
  }

  const cardType = getCardType(number);
  const masked = maskNumber(number);

  if (!isLuhnValid(number)) {
    return Response.json(result(false, cardType, masked, "Number failed the Luhn check."));
  }
  return Response.json(result(true, cardType, masked, "Valid card number."));
};

export const config = {
  path: "/api/validate",
  method: "POST",
};
