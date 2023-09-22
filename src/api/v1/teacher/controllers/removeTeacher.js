const { removeTeacherService } = require('../../../../lib/Teacher');

const removeTeacher = async (req, res, next) => {
  const id = req.params.id;

  try {
    await removeTeacherService({ id });
    res.status(204).json({ message: 'Teacher deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = removeTeacher;
