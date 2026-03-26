// --- 1. GLOBAL VARIABLES ---
let currentQuestions = [];
let currentIndex = 0;
let userScore = 0;
let timer;

document.addEventListener('DOMContentLoaded', () => {
    const authOverlay = document.getElementById('authOverlay');
    const authContent = document.getElementById('authContent');
    const closeAuth = document.getElementById('closeAuth');
    const loginTrigger = document.getElementById('loginTrigger');
    const registerTrigger = document.getElementById('registerTrigger');

    // --- 2. AUTH LOGIC ---
    function renderLogin() {
        authContent.innerHTML = `
            <span id="closeAuth" style="position:absolute; top:10px; right:15px; cursor:pointer; font-size:24px;">&times;</span>
            <h2 style="margin-bottom:20px; color:#333;">Log in</h2>
            <input type="text" class="auth-input-field" placeholder="Username" style="width:90%; padding:10px; margin-bottom:10px;">
            <input type="password" class="auth-input-field" placeholder="Password" style="width:90%; padding:10px; margin-bottom:15px;">
            <button class="btn btn-cta" style="width:100%">LOGIN</button>
            <p style="margin-top:15px;">New? <a href="#" id="toRegister" style="color:#2575fc;">Sign Up</a></p>
        `;
        document.getElementById('toRegister').onclick = (e) => { e.preventDefault(); renderRegister(); };
        document.getElementById('closeAuth').onclick = () => authOverlay.style.display = 'none';
    }

    function renderRegister() {
        authContent.innerHTML = `
            <span id="closeAuth" style="position:absolute; top:10px; right:15px; cursor:pointer; font-size:24px;">&times;</span>
            <h2 style="margin-bottom:20px; color:#333;">Sign Up</h2>
            <input type="text" class="auth-input-field" placeholder="Full Name" style="width:90%; padding:10px; margin-bottom:10px;">
            <input type="email" class="auth-input-field" placeholder="Email" style="width:90%; padding:10px; margin-bottom:10px;">
            <input type="password" class="auth-input-field" placeholder="Password" style="width:90%; padding:10px; margin-bottom:15px;">
            <button class="btn btn-cta" style="width:100%">REGISTER</button>
            <p style="margin-top:15px;">Member? <a href="#" id="toLogin" style="color:#2575fc;">Login</a></p>
        `;
        document.getElementById('toLogin').onclick = (e) => { e.preventDefault(); renderLogin(); };
        document.getElementById('closeAuth').onclick = () => authOverlay.style.display = 'none';
    }

    if (loginTrigger) loginTrigger.onclick = () => { renderLogin(); authOverlay.style.display = 'flex'; };
    if (registerTrigger) registerTrigger.onclick = () => { renderRegister(); authOverlay.style.display = 'flex'; };
    window.onclick = (e) => { if (e.target == authOverlay) authOverlay.style.display = 'none'; };

    // --- 3. QUIZ INITIALIZATION ---
    document.querySelectorAll('[data-quiz]').forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-quiz');
            startQuiz(category);
        });
    });
});

// --- 4. CORE QUIZ FUNCTIONS ---
async function startQuiz(category) {
    try {
        console.log(`Starting quiz for: ${category}`);
        // This URL must match your Spring Boot @GetMapping("category/{category}")
        const response = await fetch(`http://localhost:8082/question/category/${category}`);
        
        if (!response.ok) throw new Error("Backend not responding");
        
        currentQuestions = await response.json();

        if (currentQuestions.length === 0) {
            alert("No questions found in MySQL for this category!");
            return;
        }

        // UI Transition
        document.getElementById('home').style.display = 'none';
        document.getElementById('quizzes').style.display = 'none';
        document.getElementById('about').style.display = 'none';
        document.getElementById('quizPage').style.display = 'block';

        currentIndex = 0;
        userScore = 0;
        showQuestion();
        startTimer(30 * 60); // 30 Minute Timer
    } catch (error) {
        console.error("Fetch error:", error);
        alert("Cannot connect to Spring Boot on port 8082. Ensure the server is running!");
    }
}

function showQuestion() {
    const q = currentQuestions[currentIndex];
    document.getElementById('questionText').innerText = `${currentIndex + 1}. ${q.questionTitle}`;
    
    const options = [q.option1, q.option2, q.option3, q.option4];
    const area = document.getElementById('optionsArea');
    area.innerHTML = '';

    options.forEach((opt) => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.style.cssText = "padding: 15px; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; transition: 0.3s; background: #fff;";
        
        btn.onmouseover = () => btn.style.background = "#f0f4f8";
        btn.onmouseout = () => btn.style.background = "#fff";
        
        btn.onclick = () => checkAnswer(opt, q.rightAnswer);
        area.appendChild(btn);
    });
}

function checkAnswer(selected, correct) {
    if (selected === correct) {
        userScore++;
    }
    
    currentIndex++;
    if (currentIndex < currentQuestions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function startTimer(duration) {
    let timeLeft = duration;
    clearInterval(timer); // Clear any existing timer
    timer = setInterval(() => {
        let mins = Math.floor(timeLeft / 60);
        let secs = timeLeft % 60;
        document.getElementById('timer').innerText = `Time Left: ${mins}:${secs < 10 ? '0' : ''}${secs}`;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            endQuiz();
        }
        timeLeft--;
    }, 1000);
}

function endQuiz() {
    clearInterval(timer);
    document.getElementById('quizPage').style.display = 'none';
    document.getElementById('scorePage').style.display = 'block';
    document.getElementById('userFinalScore').innerText = `Your Score: ${userScore}/${currentQuestions.length}`;
}