import random
import json
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import re

class ChatBot:
    def __init__(self):
        self.responses = {
            'greeting': [
                'Hello! Welcome to Borrower Assistant. How can I help you today?',
                'Hi there! I\'m your AI assistant. Feel free to ask about loans, EMI, or eligibility.',
                'Hey! Great to see you. What would you like to know about borrowing?'
            ],
            'loan': [
                'We offer various types of loans including personal, home, car, and education loans. Each has different interest rates and terms.',
                'You can check our EMI calculator for specific loan amounts and tenures. What type of loan interests you?',
                'Our loans start from 8.5% interest. Use the eligibility checker to see what you qualify for.'
            ],
            'emi': [
                'EMI (Equated Monthly Installment) is the fixed amount you pay monthly towards your loan. Use our EMI calculator above!',
                'The EMI depends on loan amount, interest rate, and tenure. I can help you calculate it.',
                'Click on the EMI calculator icon to compute your monthly payments easily.'
            ],
            'eligibility': [
                'Eligibility is based on credit score, income, and other factors. Use our eligibility checker with your credit score!',
                'A credit score above 750 typically gets you better rates. Check your eligibility now!',
                'We consider multiple factors for eligibility. The credit score is a good starting point.'
            ],
            'interest': [
                'Interest rates vary by loan type: Personal (10.5%), Home (8.5%), Car (9.5%), Education (11%)',
                'Current rates are competitive. Check our calculator for exact EMI calculations.',
                'Rates depend on your credit profile. Higher credit scores get better rates.'
            ],
            'default': [
                'I understand you need assistance. Could you please be more specific? You can ask about loans, EMI, eligibility, or interest rates.',
                'I\'m here to help! You can ask me about loan products, EMI calculations, or eligibility criteria.',
                'Not sure what you need? Try clicking on the EMI calculator or eligibility checker above!'
            ]
        }
        
        self.faq_patterns = {
            r'hello|hi|hey|greetings': 'greeting',
            r'loan|borrow|credit': 'loan',
            r'emi|monthly|payment|installment': 'emi',
            r'eligible|eligibility|qualify': 'eligibility',
            r'interest|rate|percentage': 'interest'
        }
        
    def get_response(self, message):
        message = message.lower()
        
        # Check for patterns
        for pattern, category in self.faq_patterns.items():
            if re.search(pattern, message):
                return random.choice(self.responses[category])
        
        # Default response
        return random.choice(self.responses['default'])
    
    def get_suggestions(self, message):
        # Return suggested questions based on message
        suggestions = [
            "What loan types do you offer?",
            "How to calculate EMI?",
            "What credit score is needed?",
            "Current interest rates?",
            "Missed payment penalty?"
        ]
        return suggestions