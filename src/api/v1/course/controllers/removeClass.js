const { removeclassService } = require('../../../../lib/class');

const removeCourse = async (req, res, next) => {
  const id = req.params.id;

  try {
    await removeclassService({ id });
    res.status(204).json({ message: 'Course deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = removeCourse;
