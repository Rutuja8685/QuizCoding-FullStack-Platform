package com.Quiz.Quizappdata.controller;

import java.security.Principal;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import com.Quiz.Quizappdata.Server.Quiz;
import com.Quiz.Quizappdata.Server.QuizResult;
import com.Quiz.Quizappdata.Server.User;
import com.Quiz.Quizappdata.Server.QuizService;
import com.Quiz.Quizappdata.Server.QuizResultService;
import com.Quiz.Quizappdata.Server.UserService;

@Controller
@RequestMapping("/")
public class HomeController {

    @Autowired
    private QuizService quizService;
    
    @Autowired
    private QuizResultService quizResultService;

    @Autowired
    private UserService userService;

    @GetMapping("")
    public String home(Model model) {
        List<Quiz> quizzes = quizService.getAllQuizzes();

        model.addAttribute("quizzes", quizzes);

        return "home";
    }
}
