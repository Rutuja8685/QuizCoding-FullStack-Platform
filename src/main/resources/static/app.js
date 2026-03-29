// Global variables to track state
let currentQuestions = [];
let currentQuestionIndex = 0;
let userScore = 0;

// 1. EVENT LISTENERS: Listen for category selection
document.querySelectorAll('.play-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        const category = event.currentTarget.getAttribute('data-quiz');
        // This opens a new tab
        const quizWindow = window.open('', '_blank');
        
        // You can now write the quiz content to that new window
        quizWindow.document.write(`
            <html>
                <head><title>${category} Quiz</title></head>
                <body>
                    <h1>Starting ${category} Quiz...</h1>
                    <div id="questionArea"></div>
                    </body>
            </html>
        `);
    });
});
// 2. FETCH: Get data from Spring Boot
async function fetchQuestions(category) {
    try {
        const response = await fetch(`http://localhost:8082/question/category/${category}`);
        const data = await response.json();

        if (data && data.length > 0) {
            currentQuestions = data;
            currentQuestionIndex = 0;
            userScore = 0;
            loadQuestion(); // Start the first question
        } else {
            alert("No questions found in MySQL for: " + category);
            location.reload(); 
        }
    } catch (error) {
        console.error("Connection failed!", error);
        alert("Backend Error: Make sure Spring Boot is running on port 8082");
    }
}

// 3. DISPLAY: Show the question and handle answer clicks
function loadQuestion() {
    const questionText = document.getElementById('questionText');
    const optionsArea = document.getElementById('optionsArea');
    const currentQuestion = currentQuestions[currentQuestionIndex];

    // Update Question Title
    questionText.innerText = currentQuestion.questionTitle;

    // Clear previous options
    optionsArea.innerHTML = "";

    // Create array of options from JSON
    const options = [
        currentQuestion.option1, 
        currentQuestion.option2, 
        currentQuestion.option3, 
        currentQuestion.option4
    ];

    options.forEach(option => {
        const btn = document.createElement('button');
        btn.innerText = option;
        btn.className = "btn btn-outline-primary m-2"; // Use your styling
        
        btn.onclick = () => {
            // Check if answer is correct
            if (option === currentQuestion.rightAnswer) {
                userScore++;
                console.log("Correct!");
            }
            
            // Move to next question automatically or wait for "Next"
            nextQuestion();
        };
        optionsArea.appendChild(btn);
    });
}

// 4. NAVIGATION: Logic for moving through the quiz
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuestions.length) {
        loadQuestion();
    } else {
        showFinalScore();
    }
}

// 5. RESULTS: Final score screen
function showFinalScore() {
    document.getElementById('quiz-page').style.display = 'none';
    const scorePage = document.getElementById('scorePage');
    scorePage.style.display = 'block';
    
    document.getElementById('userFinalScore').innerText = 
        `Quiz Completed! Your Final Score: ${userScore} / ${currentQuestions.length}`;
}
// Existing global variables
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category');
document.getElementById('quizTitle').innerText = category + " Quiz";

// 1. Setup variables
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category') || "Java";
let questions = [];
let index = 0;
let score = 0;
let timeLeft = 20 * 60; // 20 minutes in seconds
let timerId;

// 2. Timer Logic
function startCountdown() {
    timerId = setInterval(() => {
        timeLeft--;
        
        // Calculate minutes and seconds
        const mins = Math.floor(timeLeft / 60);
        const secs = timeLeft % 60;
        
        // Update UI - using the exact ID 'timerDisplay'
        const display = document.getElementById('timerDisplay');
        if (display) {
            display.innerText = `Time Left: ${mins}:${secs < 10 ? '0' : ''}${secs}`;
        }

        // Auto-submit if time reaches zero
        if (timeLeft <= 0) {
            clearInterval(timerId);
            alert("Time's up! Your quiz will now be submitted.");
            finishQuiz();
        }
    }, 1000);
}

// 3. Submit Logic
function finishQuiz() {
    clearInterval(timerId); // Stop the timer
    const total = questions.length;
    
    // Display result screen
    document.body.innerHTML = `
        <div style="text-align: center; margin-top: 100px; font-family: sans-serif;">
            <h1>Quiz Submitted!</h1>
            <h2>Your Final Score: ${score} / ${total}</h2>
            <button onclick="window.close()" class="btn btn-primary">Close Quiz</button>
        </div>
    `;
}

// Hook up the manual submit button
document.getElementById('manualSubmit').onclick = function() {
    if (confirm("Are you sure you want to submit your quiz now?")) {
        finishQuiz();
    }
};

// 4. Load Data from Spring Boot
async function startQuiz() {
    try {
        const response = await fetch(`http://localhost:8082/question/category/${category}`);
        questions = await response.json();
        
        if (questions.length > 0) {
            startCountdown(); // Only start timer once questions load
            loadNextQuestion();
        } else {
            alert("No questions found for this category.");
        }
    } catch (error) {
        console.error("Backend error:", error);
    }
}

function loadNextQuestion() {
    if (index >= questions.length) {
        finishQuiz();
        return;
    }

    const q = questions[index];
    document.getElementById('questionText').innerText = q.questionTitle;
    
    const area = document.getElementById('optionsArea');
    area.innerHTML = ""; // Clear old options

    const options = [q.option1, q.option2, q.option3, q.option4];
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.className = "btn btn-light w-100 my-1 text-start p-3 border";
        btn.onclick = () => {
            if (opt === q.rightAnswer) score++;
            index++;
            loadNextQuestion();
        };
        area.appendChild(btn);
    });
}

// Run on page load
startQuiz();