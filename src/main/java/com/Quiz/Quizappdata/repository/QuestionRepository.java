package com.Quiz.Quizappdata.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.Quiz.Quizappdata.Server.Question;
import com.Quiz.Quizappdata.Server.Quiz;
import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Integer> {
    List<Question> findByQuiz(Quiz quiz);
}
