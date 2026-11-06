const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Sends the card number to the backend and returns the answer.
// Throws an Error with a simple message if anything goes wrong.
export async function validateCard(cardNumber) {
  let response;
  try {
    response = await fetch(`${API_URL}/api/validate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ card_number: cardNumber }),
    });
  } catch {
    throw new Error("Cannot reach the server. Is the backend running on port 5000?");
  }

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Something went wrong.");
  }
  return data;
}
