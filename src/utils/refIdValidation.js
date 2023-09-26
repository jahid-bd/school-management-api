const { findClassById } = require('../lib/class');
const { findCourseById } = require('../lib/course');
const { findUserById } = require('../lib/user');
const { badRequest } = require('./error');

const refIdValidation = async (modelName, id) => {
  switch (modelName) {
    case 'user':
      const hasUser = await findUserById(id);
      if (!hasUser) throw badRequest('Invalid User Id');
      return;

    case 'class':
      const hasClass = await findClassById(id);
      if (!hasClass) throw badRequest('Invalid Class Id');
      return;
    case 'course':
      const hasCourse = await findCourseById(id);

      if (!hasCourse) throw badRequest('Invalid Course Id');
      return;
    default:
      return;
  }
};

module.exports = refIdValidation;
