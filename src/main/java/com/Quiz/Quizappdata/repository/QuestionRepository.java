package com.Quiz.Quizappdata.repository;

import com.Quiz.Quizappdata.Server.Question;
import com.Quiz.Quizappdata.Server.Quiz; // Assuming Quiz is in the same package
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Integer> {

    // 1. Fixes: findByCategory
    List<Question> findByCategory(String category);

    // 2. Fixes: findRandomQuestionsByCategory (For your 45-day DSA/MNC prep)
    @Query(value = "SELECT * FROM questions q WHERE q.category=:category ORDER BY RAND() LIMIT 10", nativeQuery = true)
    List<Question> findRandomQuestionsByCategory(String category);

    // 3. Fixes: findByQuiz
//     List<Question> findByQuiz(Quiz quiz);
// }
}