package com.Quiz.Quizappdata.Server;

import jakarta.persistence.*;

@Entity
@Table(name = "questions")
public class Question {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @ManyToOne
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;
    
    private String questionTitle;
    private String option1;
    private String option2;
    private String option3;
    private String option4;
    private String rightAnswer;
    private String difficultylevel;
    
    // --- ADD THIS LINE HERE ---
    private String category; 

    public Question() {
    }

    // --- UPDATE THIS CONSTRUCTOR ---
    public Question(Integer id, Quiz quiz, String questionTitle, String option1, String option2, String option3, String option4, String rightAnswer, String difficultylevel, String category) {
        this.id = id;
        this.quiz = quiz;
        this.questionTitle = questionTitle;
        this.option1 = option1;
        this.option2 = option2;
        this.option3 = option3;
        this.option4 = option4;
        this.rightAnswer = rightAnswer;
        this.difficultylevel = difficultylevel;
        this.category = category; // Set it here
    }

    // ... (Keep your existing Getters/Setters) ...

    // --- ADD THESE GETTER AND SETTER AT THE BOTTOM ---
    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}