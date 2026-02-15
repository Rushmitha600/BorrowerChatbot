class FAQData:
    def __init__(self):
        self.faqs = [
            {
                'id': 1,
                'question': 'What types of loans do you offer?',
                'answer': 'We offer Personal Loans (10.5% p.a.), Home Loans (8.5% p.a.), Car Loans (9.5% p.a.), and Education Loans (11% p.a.).'
            },
            {
                'id': 2,
                'question': 'How is EMI calculated?',
                'answer': 'EMI = P × r × (1 + r)^n / ((1 + r)^n - 1), where P is principal, r is monthly interest rate, and n is tenure in months.'
            },
            {
                'id': 3,
                'question': 'What credit score is needed for a loan?',
                'answer': 'Credit score above 750 is ideal for best rates. Scores 650-749 may qualify with moderate rates. Below 600 may require alternative options.'
            },
            {
                'id': 4,
                'question': 'What happens if I miss an EMI payment?',
                'answer': 'Missing EMI payments attract a penalty of 2% per month on the overdue amount and may affect your credit score.'
            },
            {
                'id': 5,
                'question': 'Can I prepay my loan?',
                'answer': 'Yes, most loans allow prepayment. Some may have nominal charges. Check your loan terms for details.'
            },
            {
                'id': 6,
                'question': 'What documents are required?',
                'answer': 'Typically need ID proof, address proof, income proof, bank statements, and passport-size photos.'
            },
            {
                'id': 7,
                'question': 'How long does loan approval take?',
                'answer': 'Approval typically takes 2-7 working days depending on loan type and document verification.'
            },
            {
                'id': 8,
                'question': 'What is the maximum loan amount?',
                'answer': 'Loan amounts vary: Personal up to ₹25L, Home up to ₹1Cr, Car up to ₹50L, Education up to ₹50L.'
            }
        ]
    
    def get_all_faqs(self):
        return self.faqs
    
    def get_faq_by_id(self, faq_id):
        return next((faq for faq in self.faqs if faq['id'] == faq_id), None)
    
    def search_faqs(self, query):
        query = query.lower()
        return [faq for faq in self.faqs if query in faq['question'].lower() or query in faq['answer'].lower()]