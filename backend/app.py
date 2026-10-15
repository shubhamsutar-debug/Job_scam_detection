from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
from pathlib import Path

app = Flask(__name__)
CORS(app)

BASE_DIR = Path(__file__).resolve().parent

# Load the trained model and TF-IDF vectorizer
model = joblib.load(BASE_DIR / "job_model.pkl")
tfidf = joblib.load(BASE_DIR / "tfidf_vectorizer.pkl")


@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "JobShield AI — Fake Job Detection API is running!"})


@app.route("/api/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json(silent=True)

        if not isinstance(data, dict):
            return jsonify({"error": "Send a valid JSON object."}), 400

        # ── New single-field path ────────────────────────────────────────────
        # Accept a pre-combined "job_text" string (sent by the new frontend).
        if "job_text" in data:
            job_text = str(data["job_text"]).strip()

        # ── Legacy five-field path (backward compatibility) ──────────────────
        else:
            fields = [
                "title",
                "company_profile",
                "description",
                "requirements",
                "benefits",
            ]
            job_text = " ".join(
                str(data.get(field) or "").strip() for field in fields
            )

        if not job_text:
            return jsonify({"error": "Please provide job posting details."}), 400

        # Reject absurdly long inputs to protect the server
        MAX_CHARS = 20_000
        if len(job_text) > MAX_CHARS:
            return jsonify({
                "error": f"Input too long. Please keep it under {MAX_CHARS:,} characters."
            }), 400

        # Transform using the saved TF-IDF vectorizer and run prediction
        features = tfidf.transform([job_text])
        prediction = int(model.predict(features)[0])

        label = "Potentially Fraudulent" if prediction == 1 else "Likely Genuine"
        notice = (
            "This result is produced by an automated ML classifier and is "
            "a screening indicator only — not proof that a job is fraudulent "
            "or genuine. Always verify the employer independently."
        )

        return jsonify({
            "prediction": prediction,
            "label": label,
            "notice": notice,
        })

    except Exception:
        app.logger.exception("Prediction failed")
        return jsonify({
            "error": "Prediction failed. Check the backend logs."
        }), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)
