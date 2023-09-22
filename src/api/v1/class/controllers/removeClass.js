const { removeclassService } = require('../../../../lib/class');
const { removeStudentService } = require('../../../../lib/student');

const removeClass = async (req, res, next) => {
  const id = req.params.id;

  try {
    await removeclassService({ id });
    res.status(204).json({ message: 'Class deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = removeClass;
