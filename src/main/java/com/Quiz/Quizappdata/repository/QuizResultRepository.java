package com.Quiz.Quizappdata.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.Quiz.Quizappdata.Server.QuizResult;
import com.Quiz.Quizappdata.Server.User;
import com.Quiz.Quizappdata.Server.Quiz;
import java.util.List;

@Repository
public interface QuizResultRepository extends JpaRepository<QuizResult, Integer> {
    List<QuizResult> findByUser(User user);
    List<QuizResult> findByQuiz(Quiz quiz);
    List<QuizResult> findByUserAndQuiz(User user, Quiz quiz);
}
