document.addEventListener('DOMContentLoaded', () => {
    const playButtons = document.querySelectorAll('[data-quiz]');

    playButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const category = button.getAttribute('data-quiz');
            console.log(`Loading ${category} quiz...`);

            try {
                // This calls your QuestionController.java endpoint!
                const response = await fetch('/api/questions');
                const questions = await response.json();

                // Simple alert to show it works - you can build a modal later!
                if (questions.length > 0) {
                    alert(`Loaded ${questions.length} questions from the database!\nFirst Question: ${questions[0].questionTitle}`);
                } else {
                    alert("No questions found in the database. Did you run data.sql?");
                }
            } catch (error) {
                console.error("Error fetching questions:", error);
                alert("Failed to connect to the backend. Check if the server is running on 8082.");
            }
        });
    });
});