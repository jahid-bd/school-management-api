const router = require('express').Router();
const { controllers: authController } = require('../api/v1/auth');
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

module.exports = router;
