package com.Quiz.Quizappdata.repository;

import com.Quiz.Quizappdata.Server.Question;
import com.Quiz.Quizappdata.Server.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Integer> {

    // Existing method for finding by Quiz object
    List<Question> findByQuiz(Quiz quiz);

    // Your new method for picking 10 random questions by category
    @Query(value = "SELECT * FROM questions q WHERE q.category = :category ORDER BY RAND() LIMIT 10", nativeQuery = true)
    List<Question> findRandomQuestionsByCategory(@Param("category") String category);
}