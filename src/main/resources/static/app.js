function loadQuestion(data, index) {
    if (index >= data.length) {
        showScore(data.length); // End of quiz
        return;
    }

    const currentQuestion = data[index];
    const questionText = document.getElementById('questionText');
    const optionsArea = document.getElementById('optionsArea');
    const nextBtn = document.getElementById('nextBtn');

    // Display the question
    questionText.innerText = currentQuestion.questionTitle;

    // Clear and add options
    optionsArea.innerHTML = "";
    const options = [currentQuestion.option1, currentQuestion.option2, currentQuestion.option3, currentQuestion.option4];
    
    options.forEach(option => {
        const btn = document.createElement('button');
        btn.innerText = option;
        btn.className = "btn btn-secondary"; // Use your CSS class
        btn.onclick = () => {
            // Add your scoring logic here if you want
            console.log("Selected:", option);
        };
        optionsArea.appendChild(btn);
    });

    // Set up Next button
    nextBtn.onclick = () => loadQuestion(data, index + 1);
}

function showScore(total) {
    document.getElementById('quizPage').style.display = 'none';
    const scorePage = document.getElementById('scorePage');
    scorePage.style.display = 'block';
    document.getElementById('userFinalScore').innerText = `Quiz Completed! You finished all ${total} questions.`;
}