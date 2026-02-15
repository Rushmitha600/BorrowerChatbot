from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

# Loan products data
loan_products = {
    'car': {'name': 'Car Loan', 'rate': 9.5},
    'education': {'name': 'Education Loan', 'rate': 11.0},
    'home': {'name': 'Home Loan', 'rate': 8.5},
    'personal': {'name': 'Personal Loan', 'rate': 10.5}
}

@app.route('/api/loan-products', methods=['GET'])
def get_loan_products():
    return jsonify(loan_products)

@app.route('/api/calculate-emi', methods=['POST'])
def calculate_emi():
    data = request.json
    amount = data.get('amount', 0)
    rate = data.get('rate', 0)
    tenure = data.get('tenure', 0)
    
    monthly_rate = rate / (12 * 100)
    emi = amount * monthly_rate * (1 + monthly_rate)**tenure / ((1 + monthly_rate)**tenure - 1)
    
    return jsonify({
        'emi': round(emi, 2),
        'total_interest': round(emi * tenure - amount, 2),
        'total_payment': round(emi * tenure, 2)
    })


# Serve frontend static files (so visiting '/' doesn't return 404)
BASE_DIR = os.path.dirname(os.path.dirname(__file__))
FRONTEND_DIR = os.path.join(BASE_DIR, 'frontend')

@app.route('/', methods=['GET'])
def serve_index():
    return send_from_directory(FRONTEND_DIR, 'index.html')

@app.route('/<path:filename>', methods=['GET'])
def serve_frontend(filename):
    return send_from_directory(FRONTEND_DIR, filename)

if __name__ == '__main__':
    app.run(debug=True, port=5000)