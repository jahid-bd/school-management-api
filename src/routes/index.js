const router = require('express').Router();
const { attendanceControllers } = require('../api/v1/attendance');
const { controllers: authController } = require('../api/v1/auth');
const { classControllers } = require('../api/v1/class');
const { courseControllers } = require('../api/v1/course');
const { studentControllers } = require('../api/v1/student');
const { teacherControllers } = require('../api/v1/teacher');
const authenticate = require('../middleware/authenticate');

// Auth routes
router
  .post('/api/v1/auth/register', authController.register)
  .post('/api/v1/auth/login', authController.login);

router
  .route('/api/v1/students')
  .get(studentControllers.findAllStudent)
  .post(studentControllers.createStudent);

router
  .route('/api/v1/students/:id')
  .get(studentControllers.findSingleStudent)
  .put(studentControllers.updateStudent)
  .patch(studentControllers.updateStudentPatch)
  .delete(studentControllers.removeStudent);

router
  .route('/api/v1/teachers')
  .post(teacherControllers.createTeacher)
  .get(teacherControllers.findAllTeacher);

router
  .route('/api/v1/teachers/:id')
  .get(teacherControllers.findSingleTeacher)
  .put(teacherControllers.updateTeacher)
  .patch(teacherControllers.updateTeacherPatch)
  .delete(teacherControllers.removeTeacher);

router
  .route('/api/v1/classes')
  .get(classControllers.findAllClass)
  .post(classControllers.createClass);

router
  .route('/api/v1/classes/:id')
  .patch(classControllers.updateClass)
  .delete(classControllers.removeClass);

router
  .route('/api/v1/courses')
  .get(courseControllers.findAllCourse)
  .post(courseControllers.createCourse);

router
  .route('/api/v1/courses/:id')
  .patch(courseControllers.updateCourse)
  .delete(courseControllers.removeCourse);

router
  .route('/api/v1/attendance')
  .get()
  .post(attendanceControllers.createAttendance);

router
  .route('/api/v1/attendance/:id')
  .get(attendanceControllers.findSingleAttendance)
  .patch(attendanceControllers.updateAttendance)
  .delete(attendanceControllers.removeAttendance);

module.exports = router;
