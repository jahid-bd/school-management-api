const { removeStudentService } = require('../../../../lib/student');

const removeStudent = async (req, res, next) => {
  const id = req.params.id;

  try {
    await removeStudentService({ id });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = removeStudent;
