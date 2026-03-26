package com.Quiz.Quizappdata.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.Quiz.Quizappdata.Server.Question;
import com.Quiz.Quizappdata.Server.QuestionService;
import com.Quiz.Quizappdata.Server.Quiz;
import com.Quiz.Quizappdata.Server.QuizService;
import com.Quiz.Quizappdata.Server.QuizResult;
import com.Quiz.Quizappdata.Server.QuizResultService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class QuestionController {

    
    @Autowired
    private QuizService quizService;

    @Autowired
    private QuizResultService quizResultService;

    @Autowired
    QuestionService questionService;

    @GetMapping("category/{category}")
    public ResponseEntity<List<Question>> getQuestionsByCategory(@PathVariable String category) {
        // This matches the method name we just created
        return new ResponseEntity<>(questionService.getTenRandomQuestions(category), HttpStatus.OK);
    }

    @GetMapping("/questions")
    public List<Question> getAllQuestions() {
        return questionService.getAllQuestions();
    }
    
    @GetMapping("/quiz")
    public Quiz getQuiz(@RequestParam Integer quizId) {
        return quizService.getQuizById(quizId);
    }
    
    
    @PostMapping("/submit")
    public QuizResult submitQuiz(@RequestBody QuizResult result) {
        return quizResultService.saveResult(result);
    }
} // <--- This is the end of the class. Everything must be inside here.
