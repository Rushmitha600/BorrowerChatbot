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
    
    // Scroll to bottom
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
        resetEMICalculator();
    } else if (page === 'eligibility') {
        document.getElementById('eligibilityPage').classList.remove('hidden');
        resetEligibilityChecker();
    }
}

function goBack() {
    console.log('Going back to FAQ');
    
    resetEMICalculator();
    resetEligibilityChecker();
    
    document.getElementById('faqContainer').style.display = 'block';
    document.getElementById('emiPage').classList.add('hidden');
    document.getElementById('eligibilityPage').classList.add('hidden');
    document.getElementById('loanSelectionPage').classList.add('hidden');
}

// ========== RESET FUNCTIONS ==========

function resetEMICalculator() {
    console.log('Resetting EMI calculator');
    
    document.getElementById('emiLoanAmount').value = 500000;
    document.getElementById('emiInterestRate').value = 10.5;
    document.getElementById('emiTenure').value = 5;
    document.getElementById('emiCreditScore').value = 750;
    
    document.getElementById('emiResult').classList.add('hidden');
    document.getElementById('missedPaymentResult').classList.add('hidden');
    
    removeLoanIndicator();
    currentLoanType = 'none';
}

function resetEligibilityChecker() {
    console.log('Resetting eligibility checker');
    
    document.getElementById('eligibilityIncome').value = 50000;
    document.getElementById('eligibilityAge').value = 30;
    document.getElementById('eligibilityCreditScore').value = 750;
    document.getElementById('eligibilityExistingEmi').value = 0;
    document.getElementById('eligibilityResult').innerHTML = '';
}

// ========== FAQ SEARCH ==========

const faqDatabase = [
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
    }
];

function searchFAQ() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    const resultsContainer = document.getElementById('faqResults');
    
    if (searchTerm === '') {
        resultsContainer.innerHTML = '';
        return;
    }
    
    const results = faqDatabase.filter(faq => {
        if (faq.question.toLowerCase().includes(searchTerm)) return true;
        if (faq.answer.toLowerCase().includes(searchTerm)) return true;
        if (faq.keywords.some(keyword => keyword.includes(searchTerm))) return true;
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

let currentLoanType = 'none';

function showLoanSelection() {
    document.getElementById('emiPage').classList.add('hidden');
    document.getElementById('loanSelectionPage').classList.remove('hidden');
}

function hideLoanSelection() {
    document.getElementById('loanSelectionPage').classList.add('hidden');
    document.getElementById('emiPage').classList.remove('hidden');
}

function selectLoanAndCalculate(type) {
    console.log('Selected loan:', type);
    
    currentLoanType = type;
    
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
    
    removeLoanIndicator();
    addLoanIndicator(type);
    
    document.getElementById('emiResult').classList.add('hidden');
    document.getElementById('missedPaymentResult').classList.add('hidden');
    
    hideLoanSelection();
}

function addLoanIndicator(type) {
    const calculatorContent = document.querySelector('.calculator-content');
    
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
    
    document.getElementById('emiLoanAmount').value = 500000;
    document.getElementById('emiInterestRate').value = 10.5;
    document.getElementById('emiTenure').value = 5;
    
    calculateEMI();
}

function calculateEMI() {
    console.log('Calculate button clicked');
    
    const amount = parseFloat(document.getElementById('emiLoanAmount').value) || 0;
    const rate = parseFloat(document.getElementById('emiInterestRate').value) || 0;
    const years = parseFloat(document.getElementById('emiTenure').value) || 0;
    const creditScore = parseInt(document.getElementById('emiCreditScore').value) || 0;
    
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
    
    const months = years * 12;
    const monthlyRate = rate / (12 * 100);
    const emi = amount * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
    
    document.getElementById('emiResult').classList.remove('hidden');
    document.getElementById('emiAmount').textContent = '₹' + Math.round(emi).toLocaleString();
    document.getElementById('totalInterest').textContent = '₹' + Math.round(emi * months - amount).toLocaleString();
    document.getElementById('totalPayment').textContent = '₹' + Math.round(emi * months).toLocaleString();
}

function calculateMissedPayment() {
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

// ========== BANK THEMED ANIME EFFECTS ==========

// Create floating coins
function createCoin() {
    const coin = document.createElement('div');
    coin.className = 'coin';
    coin.style.left = Math.random() * 100 + '%';
    coin.style.animationDuration = (Math.random() * 5 + 5) + 's';
    coin.style.width = (Math.random() * 20 + 15) + 'px';
    coin.style.height = coin.style.width;
    document.body.appendChild(coin);
    
    setTimeout(() => {
        coin.remove();
    }, 10000);
}

// Create coins every 3 seconds
setInterval(createCoin, 3000);

// Create bank-themed sparkles on click
document.addEventListener('click', function(e) {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'bank-sparkle';
            sparkle.style.left = (e.pageX - 3 + (Math.random() * 20 - 10)) + 'px';
            sparkle.style.top = (e.pageY - 3 + (Math.random() * 20 - 10)) + 'px';
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 1000);
        }, i * 100);
    }
});

// Add bank silhouette
const bankSilhouette = document.createElement('div');
bankSilhouette.className = 'bank-silhouette';
document.body.appendChild(bankSilhouette);