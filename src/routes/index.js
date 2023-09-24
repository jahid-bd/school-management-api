const router = require('express').Router();
const { attendanceControllers } = require('../api/v1/attendance');
const { controllers: authController } = require('../api/v1/auth');
const { classControllers } = require('../api/v1/class');
const { courseControllers } = require('../api/v1/course');
const { gradeControllers } = require('../api/v1/grade');
const { studentControllers } = require('../api/v1/student');
const { teacherControllers } = require('../api/v1/teacher');
const { userControllers } = require('../api/v1/user');

const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

// Auth Routes
router
  .post('/api/v1/auth/register', authController.register)
  .post('/api/v1/auth/login', authController.login);

// User Routes
router
  .route('/api/v1/users')
  .get(authenticate, authorize(['admin']), userControllers.findAllUser)
  .post(authenticate, authorize(['admin']), userControllers.createUser);

router
  .route('/api/v1/users/:id')
  .get(authenticate, userControllers.findSingleUser)
  .patch(authenticate, authorize(['admin']), userControllers.updateUser)
  .delete(authenticate, authorize(['admin']), userControllers.removeUser);

// Student Routes
router
  .route('/api/v1/students')
  .get(
    authenticate,
    authorize(['teacher', 'admin']),
    studentControllers.findAllStudent
  )
  .post(
    authenticate,
    authorize(['admin', 'teacher']),
    studentControllers.createStudent
  );

router
  .route('/api/v1/students/:id')
  .get(
    authenticate,
    authorize(['teacher', 'admin', 'student']),
    studentControllers.findSingleStudent
  )
  .put(authenticate, authorize(['admin']), studentControllers.updateStudent)
  .patch(
    authenticate,
    authorize(['admin', 'student']),
    studentControllers.updateStudentPatch
  )
  .delete(authenticate, authorize(['admin']), studentControllers.removeStudent);

// Teacher Routes
router
  .route('/api/v1/teachers')
  .get(authenticate, authorize(['admin']), teacherControllers.findAllTeacher)
  .post(authenticate, authorize(['admin']), teacherControllers.createTeacher);

router
  .route('/api/v1/teachers/:id')
  .get(
    authenticate,
    authorize(['admin', 'teacher']),
    teacherControllers.findSingleTeacher
  )
  .put(authenticate, authorize(['admin']), teacherControllers.updateTeacher)
  .patch(
    authenticate,
    authorize(['admin', 'teacher']),
    teacherControllers.updateTeacherPatch
  )
  .delete(authenticate, authorize(['admin']), teacherControllers.removeTeacher);

// Class Routes
router
  .route('/api/v1/classes')
  .get(
    authenticate,
    authorize(['admin', 'teacher']),
    classControllers.findAllClass
  )
  .post(authenticate, authorize(['admin']), classControllers.createClass);

router
  .route('/api/v1/classes/:id')
  .patch(authenticate, authorize(['admin']), classControllers.updateClass)
  .delete(authenticate, authorize(['admin']), classControllers.removeClass);

// Course Routes
router
  .route('/api/v1/courses')
  .get(
    authenticate,
    authorize(['admin', 'teacher', 'student']),
    courseControllers.findAllCourse
  )
  .post(authenticate, authorize(['admin']), courseControllers.createCourse);

router
  .route('/api/v1/courses/:id')
  .patch(authenticate, authorize(['admin']), courseControllers.updateCourse)
  .delete(authenticate, authorize(['admin']), courseControllers.removeCourse);

// Attendance Routes
router
  .route('/api/v1/attendance')
  .get(
    authenticate,
    authorize(['admin', 'teacher', 'student']),
    attendanceControllers.findAllAttendance
  )
  .post(
    authenticate,
    authorize(['admin', 'teacher']),
    attendanceControllers.createAttendance
  );

router
  .route('/api/v1/attendance/:id')
  .get(
    authenticate,
    authorize(['admin', 'teacher', 'student']),
    attendanceControllers.findSingleAttendance
  )
  .patch(
    authenticate,
    authorize(['admin', 'teacher']),
    attendanceControllers.updateAttendance
  )
  .delete(
    authenticate,
    authorize(['admin', 'teacher']),
    attendanceControllers.removeAttendance
  );

// Grade Routes
router
  .route('/api/v1/grades')
  .get(
    authenticate,
    authorize(['admin', 'teacher', 'student']),
    gradeControllers.findAllGrade
  )
  .post(
    authenticate,
    authorize(['admin', 'teacher']),
    gradeControllers.createGrade
  );

router
  .route('/api/v1/grades/:id')
  .get(
    authenticate,
    authorize(['admin', 'teacher', 'student']),
    gradeControllers.findSingleGrade
  )
  .patch(
    authenticate,
    authorize(['admin', 'teacher']),
    gradeControllers.updateGrade
  )
  .delete(
    authenticate,
    authorize(['admin', 'teacher']),
    gradeControllers.removeGrade
  );

module.exports = router;
