import { useState } from "react";
import CardForm from "./components/CardForm";
import ResultCard from "./components/ResultCard";
import { formatCardNumber } from "./utils/formatCardNumber";
import { validateCard } from "./api/validateCard";

export default function App() {
  const [cardNumber, setCardNumber] = useState(""); // what the user typed
  const [result, setResult] = useState(null);       // answer from the backend
  const [error, setError] = useState("");           // error text, if any
  const [loading, setLoading] = useState(false);    // true while waiting

  function handleChange(raw) {
    setCardNumber(formatCardNumber(raw));
    setResult(null); // old answer no longer matches the new text
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault(); // stop the page from reloading
    setLoading(true);
    setError("");
    try {
      setResult(await validateCard(cardNumber));
    } catch (err) {
      setResult(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      <header>
        <h1>Card Validator</h1>
        <p>Check a card number the way a payment system does: length, brand and Luhn.</p>
      </header>
      <div className="layout">
        <CardForm value={cardNumber} onChange={handleChange} onSubmit={handleSubmit} onPick={handleChange} loading={loading} />
        <ResultCard result={result} error={error} />
      </div>
    </main>
  );
}
