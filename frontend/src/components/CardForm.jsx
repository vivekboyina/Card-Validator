// Test numbers only. These are public fake numbers, not real cards.
const TEST_CARDS = [
  { label: "Valid Visa", number: "4111 1111 1111 1111" },
  { label: "Valid Mastercard", number: "5555 5555 5555 4444" },
  { label: "Fails Luhn", number: "4111 1111 1111 1112" },
];

export default function CardForm({ value, onChange, onSubmit, onPick, loading }) {
  return (
    <form className="panel" onSubmit={onSubmit}>
      <label htmlFor="card-number">Card number</label>
      <input
        id="card-number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="4111 1111 1111 1111"
        inputMode="numeric"
        autoComplete="off"
      />
      <button type="submit" disabled={loading || value.length === 0}>
        {loading ? "Checking…" : "Check card"}
      </button>

      <p className="hint">No test card handy? Try one:</p>
      <div className="chips">
        {TEST_CARDS.map((card) => (
          <button type="button" className="chip" key={card.label} onClick={() => onPick(card.number)}>
            {card.label}
          </button>
        ))}
      </div>
      <p className="note">Use test numbers only. Never type a real card here.</p>
    </form>
  );
}
