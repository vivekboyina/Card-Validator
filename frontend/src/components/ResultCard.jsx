// Shows a card picture and the answer from the backend.
export default function ResultCard({ result, error }) {
  const state = error ? "error" : result ? (result.valid ? "valid" : "invalid") : "idle";
  const brand = result && result.card_type !== "Unknown" ? result.card_type : "Card";
  const digits = result ? result.masked.padStart(16, "•").replace(/(.{4})/g, "$1 ").trim() : "•••• •••• •••• ••••";

  return (
    <section className="panel" aria-live="polite">
      <div className={`card card-${state}`}>
        <div className="chip-art" />
        <p className="card-brand">{brand}</p>
        <p className="card-digits">{digits}</p>
      </div>

      {state === "idle" && <p className="status">Enter a card number and press Check card.</p>}
      {state === "error" && <p className="status status-error">{error}</p>}
      {result && (
        <p className={`status ${result.valid ? "status-valid" : "status-invalid"}`}>
          {result.valid ? "Valid. " : "Not valid. "}
          {result.message}
        </p>
      )}
    </section>
  );
}
