package com.Quiz.Quizappdata.Server;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.Quiz.Quizappdata.repository.QuestionRepository;
import com.Quiz.Quizappdata.repository.QuizRepository;
// import com.Quiz.Quizappdata.Entity.Question;// Ensure this import is correct

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private QuizRepository quizRepository;

    // 1. Fetch by Category AND Difficulty (New Feature)
    public ResponseEntity<List<Question>> getQuestionsByCategoryAndLevel(String category, String level) {
        try {
            List<Question> questions = questionRepository.findByCategoryAndDifficultyLevel(category, level);
            return new ResponseEntity<>(questions, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
    }

    // 2. Fetch Random 10 questions
    public List<Question> getTenRandomQuestions(String category) {
        return questionRepository.findRandomQuestionsByCategory(category);
    }

    // 3. Get All Questions
    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    // 4. Get Single Question by ID
    public Question getQuestionById(Integer id) {
        return questionRepository.findById(id).orElse(null);
    }

    // 5. Add a New Question
    public Question addQuestion(Question question) {
        return questionRepository.save(question);
    }

    // 6. Update a Question
    public Question updateQuestion(Question question) {
        return questionRepository.save(question);
    }

    // 7. Delete a Question
    public void deleteQuestion(Integer id) {
        questionRepository.deleteById(id);
    }
}