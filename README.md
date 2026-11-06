# 💳 Card Validator

A full-stack card number validation application built using **React, Python, and Flask**. It validates card numbers using the Luhn checksum algorithm, identifies supported card networks, and masks sensitive digits.

## ✨ Features

- **Luhn Algorithm:** Validates card numbers using the Luhn checksum algorithm.
- **Card Identification:** Identifies Visa and Mastercard based on number prefixes and length.
- **Input Validation:** Checks card number length and rejects invalid characters.
- **Card Masking:** Displays only the last four digits to avoid exposing the complete number in results.
- **REST API:** Connects the React frontend with a Python Flask backend.
- **Interactive Interface:** Displays validation results, loading states, and error messages.
- **Test Card Numbers:** Provides predefined test numbers for trying different validation scenarios.
- **Automated Testing:** Includes backend tests using Pytest and frontend tests using Vitest.

## 🛠️ Tech Stack

| Component | Technologies |
|---|---|
| Frontend | React, JavaScript, CSS |
| Build Tool | Vite |
| Backend | Python, Flask |
| API | REST API, Flask-CORS |
| Algorithm | Luhn Checksum Algorithm |
| Backend Testing | Pytest |
| Frontend Testing | Vitest |
| Version Control | Git, GitHub |

## 📂 Project Structure

```text
Card-Validator/
│
├── .gitignore
├── README.md
│
├── backend/
│   ├── app.py
│   ├── validator.py
│   ├── luhn.py
│   ├── card_type.py
│   ├── requirements.txt
│   └── tests/
│
└── frontend/
    ├── src/
    ├── package.json
    ├── package-lock.json
    └── vite.config.js
```

## ⚙️ Installation and Setup

### Prerequisites

Make sure you have installed:

- Python 3
- Node.js and npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/vivekboyina/Card-Validator.git
cd Card-Validator
```

### 2. Setup the Backend

Navigate to the backend directory:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment.

**Windows:**

```bash
venv\Scripts\activate
```

**Linux / macOS:**

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the Flask server:

```bash
python app.py
```

The backend will run at:

```text
http://localhost:5000
```

### 3. Setup the Frontend

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the URL displayed by Vite, normally:

```text
http://localhost:5173
```

The application is now ready to use.

## 🔍 How It Works

The application follows a frontend-backend architecture.

```text
       User
        |
        v
  React Frontend
        |
        | Card Number
        v
   Flask REST API
        |
        v
  Input Validation
        |
        v
  Card Type Detection
        |
        v
  Luhn Algorithm
        |
        v
  Mask Card Number
        |
        v
  JSON Response
        |
        v
  React Result Display
```

### Luhn Checksum Algorithm

The Luhn algorithm is used to check whether a card number satisfies a checksum rule.

The implementation:

1. Removes spaces and hyphens from the input.
2. Reads the digits from right to left.
3. Doubles every second digit, starting from the second digit from the right.
4. Subtracts 9 from doubled values greater than 9.
5. Adds all resulting digits.
6. Checks whether the total is divisible by 10.

If the total is divisible by 10, the number passes the Luhn checksum.

### Card Type Identification

The application identifies supported card networks using number prefixes and length rules.

| Card Network | Identification |
|---|---|
| Visa | Starts with 4; 13, 16 or 19 digits |
| Mastercard | Starts with 51–55 or 2221–2720; 16 digits |
| Unknown | Does not match supported network rules |

## 🔗 API Endpoints

The Flask backend provides the following endpoints.

### 1. Health Check

**Endpoint:**

```http
GET /api/health
```

**Example Response:**

```json
{
  "status": "ok"
}
```

### 2. Validate Card Number

**Endpoint:**

```http
POST /api/validate
```

**Request Body:**

```json
{
  "card_number": "4111 1111 1111 1111"
}
```

**Example Response:**

```json
{
  "valid": true,
  "card_type": "Visa",
  "masked": "************1111",
  "message": "Valid card number."
}
```

The API returns a validation result containing:

- `valid`: Whether the number passes validation.
- `card_type`: Identified card network or Unknown.
- `masked`: Masked card number.
- `message`: Validation result message.

Invalid card numbers that reach the validation logic return a JSON result with `valid: false`. Invalid or missing request data returns an HTTP 400 response.

## 🧪 Testing

The project includes automated tests for both frontend and backend functionality.

### Backend Tests

Navigate to the backend directory and activate the virtual environment.

Run:

```bash
pytest
```

The backend tests cover:

- Luhn algorithm validation.
- Card network identification.
- Card number masking.
- Input validation.
- Flask API endpoints.
- Invalid and malformed requests.

### Frontend Tests

Navigate to the frontend directory.

Run:

```bash
npm test
```

The frontend tests cover:

- Card number formatting.
- Input sanitization.
- Maximum input length.
- API response handling.
- API error handling.
- Backend connection failures.

## 🔐 Security Notice

**This project is intended for educational and demonstration purposes only.**

- Use public test card numbers only.
- Never enter real payment card details.
- The application does not process payments.
- It does not verify whether a card is active, authorized, or linked to a bank account.
- Luhn validation only checks the mathematical checksum of a card number.
- Card number masking is implemented for displaying validation results; this project is not a certified payment security system.

## 🚀 Future Improvements

- Support additional card networks.
- Improve validation edge-case coverage.
- Add CI/CD using GitHub Actions.
- Add API documentation.
- Containerize the application using Docker.
- Improve frontend accessibility and user experience.

## 👨‍💻 Author

**Boyina Veera Venkata Vivek**

- GitHub: [vivekboyina](https://github.com/vivekboyina)
- LinkedIn: [Boyina Veera Venkata Vivek](https://www.linkedin.com/in/boyina-veera-venkata-vivek/)

---

⭐ If you find this project interesting, consider giving the repository a star!
