package com.Quiz.Quizappdata.Server;

import java.util.List;
import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.Quiz.Quizappdata.repository.QuizResultRepository;
import com.Quiz.Quizappdata.repository.UserRepository;
import com.Quiz.Quizappdata.repository.QuizRepository;

@Service
public class QuizResultService {
    
    @Autowired
    private QuizResultRepository quizResultRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private QuizRepository quizRepository;
    
    public QuizResult saveResult(QuizResult result) {
        // Assuming the result has user, quiz set
        result.setAttemptDate(LocalDateTime.now());
        // Calculate if passed based on passing score
        if (result.getScore() >= result.getQuiz().getPassingScore()) {
            result.setStatus("PASSED");
        } else {
            result.setStatus("FAILED");
        }
        return quizResultRepository.save(result);
    }
    
    public List<QuizResult> getUserResults(Integer userId) {
        User root = userRepository.findById(userId).orElse(null);
        if (root != null) {
            return quizResultRepository.findByUser(root);
        }
        return List.of();
    }
    
    public List<QuizResult> getQuizResults(Integer quizId) {
        Quiz quiz = quizRepository.findById(quizId).orElse(null);
        if (quiz != null) {
            return quizResultRepository.findByQuiz(quiz);
        }
        return List.of();
    }
    
    public QuizResult getResultById(Integer id) {
        return quizResultRepository.findById(id).orElse(null);
    }
}
