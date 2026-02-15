// ========== COMPLETE WORKING BORROWER ASSISTANT ==========

console.log('Borrower Assistant AI - Loading...');

// ========== PAGE LOAD ==========
window.onload = function() {
    console.log('Page loaded');
    
    // Show AI page, hide others
    document.getElementById('aiPage').style.display = 'block';
    document.getElementById('faqContainer').style.display = 'none';
    document.getElementById('minimizedAI').classList.add('hidden');
    document.getElementById('emiPage').classList.add('hidden');
    document.getElementById('eligibilityPage').classList.add('hidden');
    document.getElementById('loanSelectionPage').classList.add('hidden');
    
    // Add welcome message
    setTimeout(function() {
        addMessage("👋 Welcome! I'm Finova. Ask me about loans, interest rates, eligibility, documents, EMI, etc.", 'bot');
    }, 500);
}

// ========== AI CHAT FUNCTIONS ==========

function sendMessage() {
    const input = document.getElementById('chatInput');
    if (!input) return;
    
    const message = input.value.trim();
    if (message === '') return;
    
    addMessage(message, 'user');
    input.value = '';
    
    showTypingIndicator();
    
    setTimeout(function() {
        removeTypingIndicator();
        const response = getResponse(message);
        addMessage(response, 'bot');
    }, 1000);
}

function addMessage(text, sender) {
    const chatArea = document.getElementById('chatMessages');
    if (!chatArea) return;
    
    const messageRow = document.createElement('div');
    messageRow.className = 'message-row ' + sender;
    
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble ' + sender;
    bubble.textContent = text;
    
    const time = document.createElement('div');
    time.className = 'message-time';
    const now = new Date();
    time.textContent = now.getHours().toString().padStart(2, '0') + ':' + 
                      now.getMinutes().toString().padStart(2, '0');
    
    messageRow.appendChild(bubble);
    messageRow.appendChild(time);
    chatArea.appendChild(messageRow);
    
    chatArea.scrollTop = chatArea.scrollHeight;
}

function showTypingIndicator() {
    const chatArea = document.getElementById('chatMessages');
    if (!chatArea) return;
    if (document.getElementById('typingIndicator')) return;
    
    const typingRow = document.createElement('div');
    typingRow.className = 'message-row bot';
    typingRow.id = 'typingIndicator';
    
    const typingBubble = document.createElement('div');
    typingBubble.className = 'message-bubble bot';
    typingBubble.innerHTML = '...';
    
    typingRow.appendChild(typingBubble);
    chatArea.appendChild(typingRow);
    chatArea.scrollTop = chatArea.scrollHeight;
}

function removeTypingIndicator() {
    const typing = document.getElementById('typingIndicator');
    if (typing) typing.remove();
}

function getResponse(message) {
    const lower = message.toLowerCase();
    
    if (lower.includes('hello') || lower.includes('hi')) {
        return "Hello! How can I help you with your loan today?";
    }
    if (lower.includes('interest') || lower.includes('rate')) {
        return "💰 Interest Rates:\n• Personal: 10.5% - 18%\n• Home: 8.5% - 9.8%\n• Car: 9.25% - 15%\n• Education: 11% - 16%";
    }
    if (lower.includes('eligibility')) {
        return "✅ Eligibility:\n• Age: 21-60 years\n• Income: ₹20,000+/month\n• Credit Score: 650+";
    }
    if (lower.includes('document')) {
        return "📄 Documents: Aadhar, PAN, Income proof, Bank statements, Photos";
    }
    if (lower.includes('credit') || lower.includes('score')) {
        return "📊 Credit Score:\n800+ Excellent\n750-799 Good\n700-749 Fair\n650-699 Poor\n<650 Bad";
    }
    if (lower.includes('emi')) {
        return "💳 Use our EMI calculator above for exact calculations!";
    }
    if (lower.includes('sbi')) {
        return "🏦 SBI: Personal 10.5%, Home 8.5%, Car 9.25%";
    }
    if (lower.includes('hdfc')) {
        return "🏦 HDFC: Personal 10.75%, Home 8.6%, Car 9.5%";
    }
    return "Ask me about interest rates, eligibility, documents, credit score, EMI, or specific banks like SBI, HDFC!";
}

// ========== NAVIGATION ==========

function minimizeAI() {
    document.getElementById('aiPage').style.display = 'none';
    document.getElementById('faqContainer').style.display = 'block';
    document.getElementById('minimizedAI').classList.remove('hidden');
}

function maximizeAI() {
    document.getElementById('minimizedAI').classList.add('hidden');
    document.getElementById('aiPage').style.display = 'block';
    document.getElementById('faqContainer').style.display = 'none';
}

// ========== FAQ PAGE NAVIGATION ==========

function navigateTo(page) {
    console.log('Navigate to:', page);
    
    document.getElementById('faqContainer').style.display = 'none';
    document.getElementById('emiPage').classList.add('hidden');
    document.getElementById('eligibilityPage').classList.add('hidden');
    document.getElementById('loanSelectionPage').classList.add('hidden');
    
    if (page === 'emi') {
        document.getElementById('emiPage').classList.remove('hidden');
        // Reset calculator when opening fresh
        resetEMICalculator();
    } else if (page === 'eligibility') {
        document.getElementById('eligibilityPage').classList.remove('hidden');
        // Reset eligibility checker
        resetEligibilityChecker();
    }
}
// ========== RESET ELIGIBILITY CHECKER ==========
function resetEligibilityChecker() {
    console.log('Resetting eligibility checker');
    
    document.getElementById('eligibilityIncome').value = 50000;
    document.getElementById('eligibilityAge').value = 30;
    document.getElementById('eligibilityCreditScore').value = 750;
    document.getElementById('eligibilityExistingEmi').value = 0;
    document.getElementById('eligibilityResult').innerHTML = '';
}
// ========== RESET EMI CALCULATOR ==========
function resetEMICalculator() {
    console.log('Resetting EMI calculator');
    
    // Reset to default values
    document.getElementById('emiLoanAmount').value = 500000;
    document.getElementById('emiInterestRate').value = 10.5;
    document.getElementById('emiTenure').value = 5;
    document.getElementById('emiCreditScore').value = 750;
    
    // Hide results
    document.getElementById('emiResult').classList.add('hidden');
    document.getElementById('missedPaymentResult').classList.add('hidden');
    
    // Remove loan indicator if exists
    removeLoanIndicator();
    
    // Reset current loan type
    currentLoanType = 'none';
}
// ========== NAVIGATION WITH CLEAR ==========
function goBack() {
    console.log('Going back to FAQ - Clearing everything');
    
    // Reset EMI calculator before going back
    resetEMICalculator();
    
    document.getElementById('faqContainer').style.display = 'block';
    document.getElementById('emiPage').classList.add('hidden');
    document.getElementById('eligibilityPage').classList.add('hidden');
    document.getElementById('loanSelectionPage').classList.add('hidden');
}

// ========== FAQ SEARCH ==========

// ========== FAQ SEARCH ==========
function searchFAQ() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    const resultsContainer = document.getElementById('faqResults');
    
    if (searchTerm === '') {
        resultsContainer.innerHTML = '';
        return;
    }
    
    // Search in database
    const results = faqDatabase.filter(faq => {
        // Search in question
        if (faq.question.toLowerCase().includes(searchTerm)) return true;
        // Search in answer
        if (faq.answer.toLowerCase().includes(searchTerm)) return true;
        // Search in keywords
        if (faq.keywords.some(keyword => keyword.includes(searchTerm))) return true;
        // Search in category
        if (faq.category.includes(searchTerm)) return true;
        return false;
    });
    
    displayResults(results);
}

function displayResults(results) {
    const resultsContainer = document.getElementById('faqResults');
    
    if (results.length === 0) {
        resultsContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No results found for "${document.getElementById('searchInput').value}"</h3>
                <p>Try searching with different keywords or ask Finova in chat!</p>
            </div>
        `;
        return;
    }
    
    let html = '<h3>Search Results</h3>';
    
    results.forEach(faq => {
        html += `
            <div class="faq-item">
                <div class="faq-question" onclick="toggleAnswer(${faq.id})">
                    <span class="emoji">${faq.emoji}</span>
                    <h3>${faq.question}</h3>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="faq-answer" id="answer-${faq.id}">
                    ${faq.answer}
                </div>
            </div>
        `;
    });
    
    resultsContainer.innerHTML = html;
}

function toggleAnswer(id) {
    const answer = document.getElementById(`answer-${id}`);
    answer.classList.toggle('show');
}

function quickSearch(topic) {
    document.getElementById('searchInput').value = topic;
    searchFAQ();
}

// ========== EMI CALCULATOR WITH LOAN SELECTION ==========

// Store current loan type
let currentLoanType = 'none';

function showLoanSelection() {
    document.getElementById('emiPage').classList.add('hidden');
    document.getElementById('loanSelectionPage').classList.remove('hidden');
}

function hideLoanSelection() {
    document.getElementById('loanSelectionPage').classList.add('hidden');
    document.getElementById('emiPage').classList.remove('hidden');
}

// ========== UPDATE SELECT LOAN FUNCTION ==========
function selectLoanAndCalculate(type) {
    console.log('Selected loan:', type);
    
    // Set current loan type
    currentLoanType = type;
    
    // Set values based on selected loan
    if (type === 'personal') {
        document.getElementById('emiLoanAmount').value = 500000;
        document.getElementById('emiInterestRate').value = 10.5;
    } else if (type === 'home') {
        document.getElementById('emiLoanAmount').value = 5000000;
        document.getElementById('emiInterestRate').value = 8.5;
    } else if (type === 'car') {
        document.getElementById('emiLoanAmount').value = 500000;
        document.getElementById('emiInterestRate').value = 9.5;
    } else if (type === 'education') {
        document.getElementById('emiLoanAmount').value = 500000;
        document.getElementById('emiInterestRate').value = 11.0;
    }
    
    // Remove any existing loan indicator
    removeLoanIndicator();
    
    // Add loan indicator to show which loan is selected
    addLoanIndicator(type);
    
    // Hide results when new loan is selected
    document.getElementById('emiResult').classList.add('hidden');
    document.getElementById('missedPaymentResult').classList.add('hidden');
    
    // Go back to calculator
    hideLoanSelection();
    
    // DO NOT calculate automatically - wait for Calculate button
    // Just show the values, results will appear when user clicks Calculate
}
// ========== UPDATE SHOW LOAN SELECTION ==========
function showLoanSelection() {
    console.log('Opening loan selection page');
    document.getElementById('emiPage').classList.add('hidden');
    document.getElementById('loanSelectionPage').classList.remove('hidden');
}


function hideLoanSelection() {
    console.log('Closing loan selection page');
    document.getElementById('loanSelectionPage').classList.add('hidden');
    document.getElementById('emiPage').classList.remove('hidden');
}

// ========== CLEAR LOAN SELECTION ==========
function clearLoanSelection() {
    console.log('Clearing loan selection');
    currentLoanType = 'none';
    removeLoanIndicator();
    
    // Reset to default values
    document.getElementById('emiLoanAmount').value = 500000;
    document.getElementById('emiInterestRate').value = 10.5;
    document.getElementById('emiTenure').value = 5;
    
    // Recalculate
    calculateEMI();
}

function addLoanIndicator(type) {
    const calculatorContent = document.querySelector('.calculator-content');
    
    // Create indicator div
    const indicator = document.createElement('div');
    indicator.id = 'loanIndicator';
    indicator.className = 'loan-indicator';
    
    let icon = '';
    let name = '';
    
    if (type === 'personal') {
        icon = 'fa-user';
        name = 'Personal Loan';
    } else if (type === 'home') {
        icon = 'fa-home';
        name = 'Home Loan';
    } else if (type === 'car') {
        icon = 'fa-car';
        name = 'Car Loan';
    } else if (type === 'education') {
        icon = 'fa-graduation-cap';
        name = 'Education Loan';
    }
    
    indicator.innerHTML = `
        <div class="loan-indicator-content">
            <i class="fas ${icon}"></i>
            <span><strong>Selected:</strong> ${name}</span>
            <button onclick="clearLoanSelection()" class="clear-loan-btn">
                <i class="fas fa-times"></i> Clear
            </button>
        </div>
    `;
    
    // Insert at the top of calculator content
    calculatorContent.insertBefore(indicator, calculatorContent.firstChild);
}

function removeLoanIndicator() {
    const indicator = document.getElementById('loanIndicator');
    if (indicator) {
        indicator.remove();
    }
}

function clearLoanSelection() {
    currentLoanType = 'none';
    removeLoanIndicator();
    
    // Reset to default values
    document.getElementById('emiLoanAmount').value = 500000;
    document.getElementById('emiInterestRate').value = 10.5;
    document.getElementById('emiTenure').value = 5;
    
    // Recalculate
    calculateEMI();
}

function calculateEMI() {
    console.log('Calculate button clicked');
    
    const amount = parseFloat(document.getElementById('emiLoanAmount').value) || 0;
    const rate = parseFloat(document.getElementById('emiInterestRate').value) || 0;
    const years = parseFloat(document.getElementById('emiTenure').value) || 0;
    const creditScore = parseInt(document.getElementById('emiCreditScore').value) || 0;
    
    // Validate inputs
    if (amount <= 0) {
        alert('Please enter loan amount');
        return;
    }
    if (rate <= 0) {
        alert('Please enter interest rate');
        return;
    }
    if (years <= 0) {
        alert('Please enter tenure');
        return;
    }
    if (creditScore < 300 || creditScore > 900) {
        alert('Please enter valid credit score (300-900)');
        return;
    }
    
    // Calculate EMI
    const months = years * 12;
    const monthlyRate = rate / (12 * 100);
    const emi = amount * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
    
    // Show results
    document.getElementById('emiResult').classList.remove('hidden');
    document.getElementById('emiAmount').textContent = '₹' + Math.round(emi).toLocaleString();
    document.getElementById('totalInterest').textContent = '₹' + Math.round(emi * months - amount).toLocaleString();
    document.getElementById('totalPayment').textContent = '₹' + Math.round(emi * months).toLocaleString();
}

function calculateMissedPayment() {
    console.log('Missed payment calculate');
    
    const emiAmount = document.getElementById('emiAmount').textContent.replace('₹', '').replace(/,/g, '');
    if (emiAmount && emiAmount !== '₹0' && emiAmount !== '0') {
        document.getElementById('missedPaymentResult').classList.remove('hidden');
        const emi = parseFloat(emiAmount);
        const months = parseInt(document.getElementById('missedMonths').value) || 1;
        const penalty = emi * 0.02 * months;
        const nextPayment = emi + penalty;
        document.getElementById('nextMonthAmount').textContent = '₹' + Math.round(nextPayment).toLocaleString();
    } else {
        alert('Please calculate EMI first');
    }
}

// Reset function
function resetEMICalculator() {
    console.log('Resetting EMI calculator');
    
    document.getElementById('emiLoanAmount').value = 500000;
    document.getElementById('emiInterestRate').value = 10.5;
    document.getElementById('emiTenure').value = 5;
    document.getElementById('emiCreditScore').value = 750;
    
    // Hide results
    document.getElementById('emiResult').classList.add('hidden');
    document.getElementById('missedPaymentResult').classList.add('hidden');
    
    // Remove loan indicator
    removeLoanIndicator();
    
    currentLoanType = 'none';
}

// ========== ELIGIBILITY CHECKER ==========

function checkEligibility() {
    const income = parseFloat(document.getElementById('eligibilityIncome').value) || 0;
    const age = parseInt(document.getElementById('eligibilityAge').value) || 0;
    const creditScore = parseInt(document.getElementById('eligibilityCreditScore').value) || 0;
    const existingEmi = parseFloat(document.getElementById('eligibilityExistingEmi').value) || 0;
    
    const resultDiv = document.getElementById('eligibilityResult');
    
    let color, message, details;
    
    if (creditScore < 600) {
        color = '#ef4444';
        message = '❌ Not Eligible';
        details = 'Credit score below 600. Focus on improving your score.';
    } else if (creditScore < 750) {
        color = '#f59e0b';
        message = '⚠️ Moderate Eligibility';
        details = 'You may qualify with higher interest rates.';
    } else {
        color = '#10b981';
        message = '✅ Eligible';
        details = 'You qualify for best rates!';
    }
    
    let maxAmount = 0;
    let interestRate = 0;
    
    if (creditScore >= 800) {
        maxAmount = income * 15 * 1000;
        interestRate = 8.5;
    } else if (creditScore >= 750) {
        maxAmount = income * 12 * 1000;
        interestRate = 10.5;
    } else if (creditScore >= 700) {
        maxAmount = income * 10 * 1000;
        interestRate = 12.5;
    } else if (creditScore >= 650) {
        maxAmount = income * 8 * 1000;
        interestRate = 14.5;
    } else if (creditScore >= 600) {
        maxAmount = income * 5 * 1000;
        interestRate = 16.5;
    }
    
    let issues = [];
    if (age < 21 || age > 60) issues.push('Age must be 21-60 years');
    if (income < 20000) issues.push('Minimum income required: ₹20,000');
    if (creditScore < 600) issues.push('Credit score below 600');
    if (existingEmi > income * 0.5) issues.push('Existing EMIs too high');
    
    if (issues.length > 0) {
        let issuesHtml = issues.map(issue => `<li style="color: ${color};">❌ ${issue}</li>`).join('');
        resultDiv.innerHTML = `
            <div style="border: 3px solid ${color}; border-radius: 15px; padding: 20px; margin-top: 20px;">
                <h2 style="color: ${color};">${message}</h2>
                <p>Credit Score: ${creditScore}</p>
                <ul style="list-style: none; padding: 0; text-align: left;">
                    ${issuesHtml}
                </ul>
            </div>
        `;
    } else {
        resultDiv.innerHTML = `
            <div style="border: 3px solid ${color}; border-radius: 15px; padding: 20px; margin-top: 20px;">
                <h2 style="color: ${color};">${message}</h2>
                <p>Credit Score: ${creditScore}</p>
                <p style="font-size: 24px; color: ${color};">₹${maxAmount.toLocaleString()}</p>
                <p>Interest Rate: ${interestRate}%</p>
                <p>${details}</p>
            </div>
        `;
    }
}

// ========== DARK MODE ==========

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const icon = document.querySelector('#modeToggle i');
    if (icon) {
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
}

// Enter key for chat
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && document.activeElement === document.getElementById('chatInput')) {
        sendMessage();
    }
});

// ========== FAQ DATABASE ==========
const faqDatabase = [
    // Interest Rates
    {
        id: 1,
        question: "What are personal loan interest rates?",
        answer: "Personal loan interest rates range from 10.5% to 18% p.a. depending on credit score and bank. SBI: 10.5-16%, HDFC: 10.75-17%, ICICI: 11-17.5%, Axis: 11.25-18%.",
        emoji: "💰",
        category: "interest",
        keywords: ["interest", "rate", "personal loan", "percentage"]
    },
    {
        id: 2,
        question: "What are home loan interest rates?",
        answer: "Home loan interest rates range from 8.5% to 9.8% p.a. SBI: 8.5-9.5%, HDFC: 8.6-9.6%, ICICI: 8.7-9.7%, Axis: 8.8-9.8%. Women borrowers get 0.05% concession.",
        emoji: "🏠",
        category: "interest",
        keywords: ["interest", "rate", "home loan", "mortgage"]
    },
    {
        id: 3,
        question: "What are car loan interest rates?",
        answer: "Car loan interest rates range from 9.25% to 15% p.a. New cars: 9.25-13%, Used cars: 12-16%. EV vehicles get 0.5% concession.",
        emoji: "🚗",
        category: "interest",
        keywords: ["interest", "rate", "car loan", "auto loan"]
    },
    {
        id: 4,
        question: "What are education loan interest rates?",
        answer: "Education loan interest rates range from 11% to 16% p.a. India studies: 11-14%, Abroad studies: 12-16%. Merit scholarship: 1% off for 90%+.",
        emoji: "🎓",
        category: "interest",
        keywords: ["interest", "rate", "education loan", "student loan"]
    },
    
    // Eligibility
    {
        id: 5,
        question: "Am I eligible for personal loan?",
        answer: "Personal loan eligibility: Age 21-60 years, Income ₹20,000+/month, Credit score 650+, Employment 1+ years. Self-employed need 2+ years business.",
        emoji: "✅",
        category: "eligibility",
        keywords: ["eligible", "eligibility", "personal loan", "qualify"]
    },
    {
        id: 6,
        question: "Am I eligible for home loan?",
        answer: "Home loan eligibility: Age 21-65 years, Income ₹25,000+/month, Credit score 650+, Property value min ₹10 lakhs. Joint applicants get 40% higher eligibility.",
        emoji: "🏠",
        category: "eligibility",
        keywords: ["eligible", "eligibility", "home loan", "qualify"]
    },
    {
        id: 7,
        question: "Am I eligible for car loan?",
        answer: "Car loan eligibility: Age 21-60 years, Income ₹15,000+/month, Credit score 600+. New cars: lower income accepted. Used cars: car age <5 years.",
        emoji: "🚗",
        category: "eligibility",
        keywords: ["eligible", "eligibility", "car loan", "qualify"]
    },
    {
        id: 8,
        question: "Am I eligible for education loan?",
        answer: "Education loan eligibility: Student age 16-35 years, Admission to recognized course, Co-applicant income ₹25,000+/month. No collateral up to ₹4 lakhs.",
        emoji: "🎓",
        category: "eligibility",
        keywords: ["eligible", "eligibility", "education loan", "student"]
    },
    
    // Documents
    {
        id: 9,
        question: "What documents are needed for personal loan?",
        answer: "Personal loan documents: Identity proof (Aadhar/PAN), Address proof, Income proof (salary slips/IT returns), Bank statements (6 months), Passport photos.",
        emoji: "📄",
        category: "documents",
        keywords: ["document", "docs", "personal loan", "paperwork"]
    },
    {
        id: 10,
        question: "What documents are needed for home loan?",
        answer: "Home loan documents: Identity & address proof, Income proof, Property papers, Bank statements (12 months), IT returns (3 years), Processing fee cheque.",
        emoji: "🏠",
        category: "documents",
        keywords: ["document", "docs", "home loan", "property"]
    },
    {
        id: 11,
        question: "What documents are needed for car loan?",
        answer: "Car loan documents: Identity & address proof, Income proof, Bank statements (6 months), Car quotation, RC copy (used cars), Insurance, Photos.",
        emoji: "🚗",
        category: "documents",
        keywords: ["document", "docs", "car loan", "vehicle"]
    },
    {
        id: 12,
        question: "What documents are needed for education loan?",
        answer: "Education loan documents: Student ID, Admission letter, Fee structure, Marksheets, Co-applicant income proof, Bank statements, Collateral docs (if applicable).",
        emoji: "🎓",
        category: "documents",
        keywords: ["document", "docs", "education loan", "student"]
    },
    
    // Repayment
    {
        id: 13,
        question: "How does loan repayment work?",
        answer: "Loan repayment through EMIs (Equated Monthly Installments). Options: Auto-debit from bank account, UPI payments, Debit card, Net banking, EMI payment apps.",
        emoji: "💸",
        category: "repayment",
        keywords: ["repay", "repayment", "emi", "pay"]
    },
    {
        id: 14,
        question: "Can I change my EMI date?",
        answer: "Yes, most banks allow changing EMI date once per year. Contact bank or use net banking. May have small fee for change.",
        emoji: "📅",
        category: "repayment",
        keywords: ["date", "change", "emi date", "repayment date"]
    },
    
    // Prepayment
    {
        id: 15,
        question: "Can I prepay my loan?",
        answer: "Yes! Floating rate loans: No prepayment charges. Fixed rate loans: 2-5% charges. Partial prepayment: Min ₹10,000 allowed. Some banks offer 1 free prepayment/year.",
        emoji: "⚡",
        category: "prepayment",
        keywords: ["prepay", "prepayment", "foreclosure", "early payment"]
    },
    {
        id: 16,
        question: "What are prepayment charges?",
        answer: "Prepayment charges: Floating rate loans (Nil), Fixed rate loans (2-5% of outstanding). Some loans have no charges after 6-12 months.",
        emoji: "💰",
        category: "prepayment",
        keywords: ["charges", "prepayment", "fee", "foreclosure"]
    },
    
    // Credit Score
    {
        id: 17,
        question: "What is a good credit score?",
        answer: "Credit score ranges: Excellent (800-900): Best rates, Good (750-799): Easy approval, Fair (700-749): Moderate rates, Poor (650-699): Higher rates, Bad (<650): Need improvement.",
        emoji: "📊",
        category: "credit",
        keywords: ["credit score", "cibil", "good score", "rating"]
    },
    {
        id: 18,
        question: "How to improve credit score?",
        answer: "To improve credit score: 1. Pay all EMIs on time, 2. Keep credit utilization <30%, 3. Don't close old cards, 4. Limit loan applications, 5. Check CIBIL report yearly.",
        emoji: "📈",
        category: "credit",
        keywords: ["improve", "increase", "credit score", "cibil"]
    },
    {
        id: 19,
        question: "How to check credit score for free?",
        answer: "Free credit score check: CRED app, Paytm, Google Pay, Amazon Pay, Bank apps (SBI YONO, HDFC NetBanking), CIBIL official site (1 free/year).",
        emoji: "🔍",
        category: "credit",
        keywords: ["check", "free", "credit score", "cibil"]
    },
    {
        id: 20,
        question: "What is minimum credit score for loan?",
        answer: "Minimum credit score: Personal loan (650), Home loan (650), Car loan (600), Education loan (600). Higher scores get better rates.",
        emoji: "📉",
        category: "credit",
        keywords: ["minimum", "required", "credit score", "cibil"]
    }
];

// ========== ANIME CLICK SPARKLE EFFECT ==========
document.addEventListener('click', function(e) {
    // Create sparkle effect on click
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'click-sparkle';
            sparkle.style.left = (e.pageX - 5 + (Math.random() * 20 - 10)) + 'px';
            sparkle.style.top = (e.pageY - 5 + (Math.random() * 20 - 10)) + 'px';
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 1000);
        }, i * 100);
    }
});

// Add floating cherry blossoms
function createBlossom() {
    const blossom = document.createElement('div');
    blossom.className = 'blossom';
    blossom.style.left = Math.random() * 100 + '%';
    blossom.style.animationDuration = (Math.random() * 5 + 5) + 's';
    blossom.style.width = (Math.random() * 15 + 10) + 'px';
    blossom.style.height = blossom.style.width;
    blossom.style.opacity = Math.random() * 0.3 + 0.2;
    document.body.appendChild(blossom);
    
    setTimeout(() => {
        blossom.remove();
    }, 10000);
}

// Create blossoms every 2 seconds
setInterval(createBlossom, 2000);

// Add twinkling stars
function createStar() {
    const star = document.createElement('div');
    star.className = 'twinkling-star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 3 + 's';
    document.body.appendChild(star);
}

// Create stars on load
for (let i = 0; i < 50; i++) {
    setTimeout(() => {
        createStar();
    }, i * 100);
}