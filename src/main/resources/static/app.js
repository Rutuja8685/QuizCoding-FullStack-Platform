// 1. GLOBAL VARIABLES
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
let timeLeft = 60;

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. ELEMENT SELECTION ---
    const authOverlay = document.getElementById('authOverlay');
    const authContent = document.getElementById('authContent');
    const closeAuth = document.getElementById('closeAuth');
    const loginTrigger = document.getElementById('loginTrigger');
    const registerTrigger = document.getElementById('registerTrigger');
    const javaPlayBtn = document.querySelector('[data-quiz="java"]');

    // --- 2. AUTH MODAL LOGIC ---
    function renderLogin() {
        authContent.innerHTML = `
            <h2 style="margin-bottom:20px; color:#333;">Log in to your profile</h2>
            <button class="btn-google-auth">
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_Logo.svg" style="width:18px;"> Continue with Google
            </button>
            <div style="margin:15px 0; color:#888; font-size:12px;">OR</div>
            <input type="text" class="auth-input-field" placeholder="Username or Email">
            <input type="password" class="auth-input-field" placeholder="Password">
            <button class="btn-auth-confirm">LOGIN</button>
            <p style="margin-top:15px; font-size:14px;">New to QuizCoding? <a href="#" id="toRegister" style="color:#4285f4; text-decoration:none; font-weight:bold;">Sign Up</a></p>
        `;
        document.getElementById('toRegister').onclick = (e) => { e.preventDefault(); renderRegister(); };
    }

    function renderRegister() {
        authContent.innerHTML = `
            <h2 style="margin-bottom:20px; color:#333;">Join QuizCoding</h2>
            <button class="btn-google-auth">
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_Logo.svg" style="width:18px;"> Continue with Google
            </button>
            <div style="margin:15px 0; color:#888; font-size:12px;">OR</div>
            <input type="text" class="auth-input-field" placeholder="Full Name">
            <input type="email" class="auth-input-field" placeholder="Email Address">
            <input type="password" class="auth-input-field" placeholder="Create Password">
            <button class="btn-auth-confirm">SIGN UP</button>
            <p style="margin-top:15px; font-size:14px;">Already have an account? <a href="#" id="toLogin" style="color:#4285f4; text-decoration:none; font-weight:bold;">Login</a></p>
        `;
        document.getElementById('toLogin').onclick = (e) => { e.preventDefault(); renderLogin(); };
    }

    // --- 3. EVENT LISTENERS ---
    if (loginTrigger) {
        loginTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            renderLogin();
            authOverlay.style.display = 'flex';
        });
    }

    if (registerTrigger) {
        registerTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            renderRegister();
            authOverlay.style.display = 'flex';
        });
    }

    if (closeAuth) {
        closeAuth.onclick = () => { authOverlay.style.display = 'none'; };
    }

    window.onclick = (e) => {
        if (e.target == authOverlay) authOverlay.style.display = 'none';
    };

    // --- 4. ATTACH QUIZ START ---
    if (javaPlayBtn) {
        javaPlayBtn.addEventListener('click', startJavaQuiz);
    }
});

// --- 5. QUIZ LOGIC (Outside to ensure global scope) ---

async function startJavaQuiz() {
    console.log("Fetching Java questions...");
    try {
        // Ensure this URL matches your @GetMapping in QuestionController
        const response = await fetch('http://localhost:8082/java'); 
        currentQuestions = await response.json();
        
        if (currentQuestions.length === 0) {
            alert("No questions found for 'java' category.");
            return;
        }

        // Hide UI and show Quiz
        document.getElementById('home').style.display = 'none';
        document.getElementById('quizzes').style.display = 'none';
        document.getElementById('quizContainer').style.display = 'block';
        
        showQuestion();
        startTimer();
    } catch (err) {
        console.error("Fetch Error:", err);
        alert("Failed to connect to Spring Boot. Check console (F12) for details.");
    }
}

function showQuestion() {
    const q = currentQuestions[currentQuestionIndex];
    document.getElementById('questionText').innerText = `${currentQuestionIndex + 1}. ${q.questionTitle}`;
    
    // Injecting buttons with the correct onclick calls
    const optionsHtml = `
        <button class="btn-auth-confirm" style="background:#f8f9fa; color:#333; margin-bottom:10px;" onclick="checkAnswer('A')">A) ${q.option1}</button>
        <button class="btn-auth-confirm" style="background:#f8f9fa; color:#333; margin-bottom:10px;" onclick="checkAnswer('B')">B) ${q.option2}</button>
        <button class="btn-auth-confirm" style="background:#f8f9fa; color:#333; margin-bottom:10px;" onclick="checkAnswer('C')">C) ${q.option3}</button>
        <button class="btn-auth-confirm" style="background:#f8f9fa; color:#333; margin-bottom:10px;" onclick="checkAnswer('D')">D) ${q.option4}</button>
    `;
    document.getElementById('optionsArea').innerHTML = optionsHtml;
}

function startTimer() {
    timeLeft = 60;
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            endQuiz();
        }
    }, 1000);
}

function checkAnswer(selected) {
    if (selected === currentQuestions[currentQuestionIndex].rightAnswer) {
        score++;
    }
    
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuestions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(timerInterval);
    document.getElementById('quizContainer').style.display = 'none';
    document.getElementById('resultContainer').style.display = 'block';
    document.getElementById('finalScore').innerText = `Your Score: ${score}/${currentQuestions.length}`;
}