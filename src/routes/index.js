const router = require('express').Router();
const { controllers: authController } = require('../api/v1/auth');
const { studentControllers } = require('../api/v1/student');
const authenticate = require('../middleware/authenticate');

// Auth routes
router
  .post('/api/v1/auth/register', authController.register)
  .post('/api/v1/auth/login', authController.login);

router
  .route('/api/v1/students')
  .get(studentControllers.findAllStudent)
  .post(studentControllers.createStudent);

module.exports = router;
