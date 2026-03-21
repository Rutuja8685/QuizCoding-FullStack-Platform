package com.Quiz.Quizappdata.Server;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.Quiz.Quizappdata.repository.QuestionRepository;
import com.Quiz.Quizappdata.repository.QuizRepository;

@Service
public class QuestionService {
    
    @Autowired
    private QuestionRepository questionRepository;
    
    @Autowired
    private QuizRepository quizRepository;
    
    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }
    
    public List<Question> getQuestionsByQuizId(Integer quizId) {
        Quiz quiz = quizRepository.findById(quizId).orElse(null);
        if (quiz != null) {
            return questionRepository.findByQuiz(quiz);
        }
        return List.of();
    }
    
    public Question getQuestionById(Integer id) {
        return questionRepository.findById(id).orElse(null);
    }
    
    public Question addQuestion(Question question) {
        return questionRepository.save(question);
    }
    
    public Question updateQuestion(Question question) {
        return questionRepository.save(question);
    }
    
    public void deleteQuestion(Integer id) {
        questionRepository.deleteById(id);
    }
}
