-- 1. Insert into users (This matches your Hibernate 'users' table)
INSERT INTO users (username, email, password, first_name, last_name) 
VALUES ('testuser', 'test@example.com', 'password123', 'John', 'Doe');

-- 2. Insert into quizzes (CHANGED FROM 'quiz' TO 'quizzes')
INSERT INTO quizzes (title, description, total_questions, passing_score, time_limit, category) 
VALUES ('Java Basics Quiz', 'Test your knowledge of Java fundamentals', 3, 70, 10, 'Programming');

-- 3. Insert into questions (This matches your Hibernate 'questions' table)
-- NOTE: I also changed 'difficultylevel' to 'difficulty_level' to match Hibernate naming
INSERT INTO questions (quiz_id, question_title, option1, option2, option3, option4, right_answer, difficultylevel) 
VALUES (1, 'What is the size of int in Java?', '2 bytes', '4 bytes', '8 bytes', '16 bytes', '4 bytes', 'Easy');

INSERT INTO questions (quiz_id, question_title, option1, option2, option3, option4, right_answer, difficultylevel) 
VALUES (1, 'Which keyword is used to define a class in Java?', 'class', 'define', 'struct', 'object', 'class', 'Easy');

INSERT INTO questions (quiz_id, question_title, option1, option2, option3, option4, right_answer, difficultylevel) 
VALUES (1, 'What is the default value of a boolean in Java?', 'true', 'false', 'null', '0', 'false', 'Easy');