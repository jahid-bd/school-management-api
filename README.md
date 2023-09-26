# School Management System (SMS)

The School Management System (SMS) is a comprehensive software solution designed to streamline and manage various aspects of educational institutions, including student management, teacher management, class management, course management, attendance tracking, and assessment management. This repository contains the backend API for the SMS project.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [ER Diagram](#er-diagram)
- [Contributing](#contributing)
- [License](#license)

## Features

- User Management (Admin, Teacher, Student)
- Student Profile Management
- Teacher Profile Management
- Class Management
- Course Management
- Attendance Tracking
- Assessment Management
- Class Scheduling
- API Authentication
- Pagination and Filtering
- Error Handling

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- Bcrypt.js
- Swagger (API Documentation)
- Git & GitHub for Version Control

## Getting Started

To set up the SMS project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/jahid-bd/school-management-api.git

2. Install dependencies:
   
   ```bash
   bashCopy code
   cd school-management-system
   npm install
   ```
3. Set up the environment variables:
   Create a **`.env`** file in the project root and configure the following variables:
   ```bash
   PORT=400	
   DB_URL = 'db/data.json'
   DB_USERNAME='db-username'
   DB_PASSWORD='db-password'
   DB_CONNECTION_URL='mongodb://<username>:<password>@localhost:27017'
   DB_NAME = 'db-name'
   ACCESS_TOKEN_SECRET='access-token-secret'
   ```
   
5. Start the server

   ```bash
   npm run dev
   ```
   The SMS API server should now be running locally on port 4000.

# Api Endpoints
   
### User Management (Auth)

- **`POST api/auth/register` :** Register a new user (student, teacher)
- **`POST api/auth/login`** : ****Authenticate users (teachers, students, administrators)
- **`GET api/users`** : get all users
- **`GET api/users/:id`** : get single user by id
- **`PUT api/users/:id` :** update a user profile information by id
- **`DELETE api/users/:id` :** delete a user profile by id
- **`PATCH api/users/:id/password` :**  change password by id

### Student Management

- **`POST api/students` :** create a new student
- **`GET api/students`** : get all students
- **`GET api/students/:id`** : get a single student by id
- **`PUT api/students/:id` :** update a student profile information using put by id
- `**PATCH api/students/:id**` : update a student profile information using patch by id
- **`DELETE api/students/:id` :** delete a student profile by id

### Teacher Management

- **`POST api/teachers` :** create a new teacher
- **`GET api/teachers`** : get all teachers
- **`GET api/teachers/:id`** : get a single teacher by id
- **`PUT api/teachers/:id` :** update a teacher profile information by id
- **`DELETE api/students/:id` :** delete a teacher profile

### Class Management

- **`GET /api/classes`**: get a list of all classes.
- **`GET /api/classes/:id`**: get class details by ID.
- **`POST /api/classes`**: Create a new class.
- **`PUT /api/classes/:id`**: Update class information.
- **`DELETE /api/classes/:id`**: Delete a class.

### Course Management

- **`GET /api/courses`**: get all courses.
- **`GET /api/courses/:id`**: get course details by ID.
- **`POST /api/courses`**: Create a new course.
- **`PUT /api/courses/:id`**: Update course information.
- **`DELETE /api/courses/:id`**: Delete a course.

### Attendance Management

- **`POST /api/attendance/:classId`**: Record student attendance for a specific class.
- **`GET /api/attendance/:classId/:date`**: Retrieve attendance records for a specific class on a given date.
- **`GET /api/attendance/student/:studentId` :** Retrieve attendance records for a specific student

### Grade Management

- **`GET /api/grades/:studentId`**: Retrieve grades for a specific student.
- **`POST /api/grades`**: Record grades for assignments, exams, etc.
- **`PUT /api/grades/:id`**: Update a grade record.
- **`DELETE /api/grades/:id`**: Delete a grade record.
  
## **Database Models**

The SMS project uses MongoDB with the following database models:

- User
- Student
- Teacher
- Class
- Course
- Attendance
- Assessment
- Class Schedule

# ER Diagram
https://drive.google.com/file/d/1IuoyKls2ucoBcnk_sZe9BLxmWHSrMxEX/view?usp=sharing

# Contributing
Contributions to the SMS project are welcome! If you have any feature requests, bug reports, or suggestions, please open an issue or create a pull request.

# License
This project is licensed under the MIT License.
