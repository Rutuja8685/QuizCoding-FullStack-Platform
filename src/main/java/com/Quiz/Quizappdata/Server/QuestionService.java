package com.Quiz.Quizappdata.Server;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.Quiz.Quizappdata.repository.QuestionRepository;
import com.Quiz.Quizappdata.repository.QuizRepository;

@Service
public class QuestionService {
    
   public ResponseEntity<List<Question>> getQuestionsByCategory(String category) {
    try {
        return new ResponseEntity<>(questionRepository.findByCategory(category), HttpStatus.OK);
    } catch (Exception e) {
        e.printStackTrace();
    }
    return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
}

    @Autowired
    QuestionRepository questionRepository;

    public List<Question> getTenRandomQuestions(String category) {
        return questionRepository.findRandomQuestionsByCategory(category);
    }
    
    @Autowired
    private QuizRepository quizRepository;
    
    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }
    
    // public List<Question> getQuestionsByQuizId(Integer quizId) {
    //     Quiz quiz = quizRepository.findById(quizId).orElse(null);
    //     if (quiz != null) {
    //         return questionRepository.findByQuiz(quiz);
    //     }
    //     return List.of();
    // }
    
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
