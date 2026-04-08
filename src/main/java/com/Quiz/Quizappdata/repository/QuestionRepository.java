package com.Quiz.Quizappdata.repository;

import com.Quiz.Quizappdata.Server.Question;
import com.Quiz.Quizappdata.Server.Quiz; // Assuming Quiz is in the same package
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Integer> {

    // 1. THIS NAME MATTERS: findBy[Category]And[DifficultyLevel]
    // It must match the variable names in your Question class exactly.
    List<Question> findByCategoryAndDifficultyLevel(String category, String difficultyLevel);

    // 2. Your Native Query for random questions
    @Query(value = "SELECT * FROM question WHERE category=:category ORDER BY RAND() LIMIT 10", nativeQuery = true)
    List<Question> findRandomQuestionsByCategory(String category);
}