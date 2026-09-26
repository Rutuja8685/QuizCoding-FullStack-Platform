# QuizCoding Full-Stack Platform

A Spring Boot quiz platform for creating and taking timed quizzes, tracking results, and practicing secure full-stack application design.

## Features

- User registration and login with Spring Security
- BCrypt password hashing
- Quiz categories and difficulty levels
- Configurable question counts and time limits
- Interactive quiz flow with progress tracking
- Automatic scoring and pass/fail status
- Results history and performance analytics
- Thymeleaf-based web interface

## Technology

- Java 17
- Spring Boot 3.2.4
- Spring MVC, Spring Data JPA, and Spring Security
- Thymeleaf
- MySQL
- Maven and Docker Compose
- HTML, CSS, and JavaScript

## Architecture

The code is organized around controllers, services, repositories, entities, security configuration, and Thymeleaf templates. The main domain objects are users, quizzes, questions, and quiz results.

## Run locally

### Prerequisites

- Java 17+
- Docker Desktop with Docker Compose
- Git

### Start MySQL

~~~bash
docker compose up -d
~~~

### Build and run the application

~~~bash
./mvnw clean package
./mvnw spring-boot:run
~~~

On Windows, use mvnw.cmd instead of ./mvnw.

### Run tests

~~~bash
./mvnw test
~~~

## Main flows

- POST /auth/register — register a user
- POST /auth/login — authenticate a user
- GET /quiz/allQuestions — retrieve available questions
- GET /quiz/questions?quizId={id} — retrieve questions for a quiz
- POST /quiz/submit — submit answers and calculate results

## Security notes

Use local environment configuration for database credentials. Never commit real passwords, tokens, or production connection strings.
