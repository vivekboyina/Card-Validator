from flask import Flask, jsonify, request
from flask_cors import CORS

from validator import validate_card

app = Flask(__name__)
CORS(app)  # allow the React app to call us


@app.get("/api/health")
def health():
    return jsonify({"status": "ok"})


@app.post("/api/validate")
def validate():
    # silent=True: return None instead of crashing on bad JSON
    data = request.get_json(silent=True)

    if not data or not isinstance(data.get("card_number"), str):
        return jsonify({"error": "card_number (text) is required."}), 400

    # Note: we never print or store the card number.
    return jsonify(validate_card(data["card_number"])), 200


if __name__ == "__main__":
    app.run(port=5000, debug=True)