
import requests

url = "http://127.0.0.1:5000/api/predict"

job = {
    "title": "Software Developer",
    "company_profile": "A technology company developing software products.",
    "description": "We are looking for a software developer to join our team.",
    "requirements": "Python, Java, SQL and problem-solving skills.",
    "benefits": "Training, career development and paid leave."
}

try:
    response = requests.post(url, json=job, timeout=30)
    print("Status code:", response.status_code)
    print("Response:", response.json())
except requests.exceptions.RequestException as e:
    print("Request failed:", e)
