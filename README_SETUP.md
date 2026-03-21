# Quiz App - Spring Boot & MySQL

A full-featured web-based quiz application built with Spring Boot, Spring Security, Thymeleaf, and MySQL.

## Features

✓ **User Management**
- User registration with form validation
- Secure login/logout with bcrypt password hashing
- User profile tracking

✓ **Quiz Management**
- Multiple quizzes with different categories
- Configurable number of questions
- Time limits for quizzes
- Difficulty levels for questions

✓ **Quiz Taking**
- Interactive quiz interface with progress tracking
- Timer countdown
- Multiple choice questions
- Real-time progress updates

✓ **Results & Scoring**
- Automatic scoring based on correct answers
- Pass/Fail status based on passing score threshold
- Results history tracking
- Performance analytics

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- Docker & Docker Compose (for MySQL)
- Git

## Architecture

```
QuizApp
├── configuration
│   └── SecurityConfig.java          (Spring Security Configuration)
├── controller
│   ├── AuthController.java          (User registration & login)
│   ├── HomeController.java          (Dashboard)
│   └── QuestionController.java      (Quiz endpoints)
├── models
│   ├── User.java                    (User entity)
│   ├── Quiz.java                    (Quiz entity)
│   ├── Question.java                (Question entity)
│   └── QuizResult.java              (Result tracking)
├── repository
│   ├── UserRepository.java
│   ├── QuizRepository.java
│   ├── QuestionRepository.java
│   └── QuizResultRepository.java
├── service
│   ├── UserService.java             (User business logic)
│   ├── QuizService.java             (Quiz management)
│   ├── QuestionService.java         (Question management)
│   └── QuizResultService.java       (Result tracking)
└── resources/templates
    ├── auth/
    │   ├── login.html               (Login page)
    │   └── register.html            (Registration page)
    ├── quiz/
    │   ├── questions.html           (Quiz taking)
    │   └── result.html              (Results display)
    └── home.html                    (Dashboard)
```

## Database Schema

### Users Table
```sql
- id (PK)
- username (UNIQUE)
- email (UNIQUE)
- password (hashed)
- firstName
- lastName
```

### Quizzes Table
```sql
- id (PK)
- title
- description
- totalQuestions
- passingScore
- timeLimit (in minutes)
- category
```

### Questions Table
```sql
- id (PK)
- quiz_id (FK)
- questionTitle
- option1, option2, option3, option4
- rightAnswer
- difficultylevel
```

### Quiz Results Table
```sql
- id (PK)
- user_id (FK)
- quiz_id (FK)
- score
- totalQuestions
- correctAnswers
- attemptDate
- status (PASSED/FAILED)
```

## Setup Instructions

### 1. Start MySQL with Docker

```bash
cd c:\Myfirstproject\Quizappdata
docker-compose up -d
```

This will start:
- MySQL on port 3306 (credentials: quizapp/quizapp123)
- PhpMyAdmin on port 8081 (access at http://localhost:8081)

### 2. Build the Application

```bash
cd c:\Myfirstproject\Quizappdata
mvn clean install
```

### 3. Run the Application

```bash
mvn spring-boot:run
```

Or package and run as JAR:
```bash
mvn clean package
java -jar target/Quizappdata-0.0.1-SNAPSHOT.jar
```

The application will be available at: **http://localhost:8080**

## Usage Guide

### Registration & Login
1. Navigate to http://localhost:8080/auth/register
2. Fill in your details (username, email, name, password)
3. Click "Register"
4. Login with your credentials at http://localhost:8080/auth/login

### Taking a Quiz
1. After login, you'll see the dashboard with available quizzes
2. Click "Start Quiz" on any quiz card
3. Answer all questions before time runs out
4. Click "Submit Quiz" to see your results

### Viewing Results
- All your quiz results are displayed on the dashboard
- See your score, number of correct answers, and status (PASSED/FAILED)

## Adding Quizzes

To add sample data, use PhpMyAdmin or SQL queries:

```sql
INSERT INTO quizzes (title, description, total_questions, passing_score, time_limit, category)
VALUES 
('Java Basics', 'Test your Java fundamentals', 10, 70, 15, 'Programming'),
('Spring Boot 101', 'Learn Spring Boot concepts', 8, 60, 12, 'Framework');

INSERT INTO questions (quiz_id, question_title, option1, option2, option3, option4, right_answer, difficultylevel)
VALUES 
(1, 'What is Java?', 'Language', 'Framework', 'Library', 'Platform', 'Language', 'Easy'),
(1, 'What does JPA stand for?', 'Java Package API', 'Java Persistence API', 'Java Platform Architecture', 'Java Programming Application', 'Java Persistence API', 'Medium');
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/logout` - Logout user

### Quiz Operations
- `GET / ` - Dashboard (protected)
- `GET /quiz/allQuestions` - Get all questions (API)
- `GET /quiz/questions?quizId=1` - Get questions for a quiz
- `POST /quiz/submit` - Submit quiz answers

## Security Features

- **Password Encryption**: Uses BCrypt for secure password hashing
- **Session Management**: HTTP session-based authentication
- **CSRF Protection**: Spring Security CSRF tokens
- **Access Control**: Protected endpoints require authentication

## Troubleshooting

### MySQL Connection Issues
```bash
# Check if MySQL container is running
docker ps

# View container logs
docker logs quiz-app-mysql

# Restart containers
docker-compose restart
```

### Application Won't Start
```bash
# Check if port 8080 is in use
netstat -ano | findstr :8080

# Clean build
mvn clean install -DskipTests
```

### Database Schema Not Created
- The schema will be auto-created with `ddl-auto=update`
- Check application logs for Hibernate SQL execution

## Development Tips

### Hot Reload
```bash
mvn spring-boot:run -Dspring-boot.run.arguments="-Dspring.devtools.restart.enabled=true"
```

### Check Database
Access PhpMyAdmin at http://localhost:8081 with:
- Server: mysql
- Username: root
- Password: 7548

### View Logs
```bash
tail -f application.log
```

## Future Enhancements

- [ ] Question image support
- [ ] Different question types (true/false, fill-in-the-blank)
- [ ] Admin dashboard for quiz management
- [ ] Leaderboard and statistics
- [ ] Email notifications
- [ ] Mobile app version
- [ ] API documentation (Swagger)

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please create an issue in the repository or contact the development team.

---

**Happy Learning! 📚**
