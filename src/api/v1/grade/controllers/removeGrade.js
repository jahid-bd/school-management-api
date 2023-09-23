const { removeGradeService } = require('../../../../lib/grade');

const removeGrade = async (req, res, next) => {
  const id = req.params.id;

  try {
    await removeGradeService({ id });

    res.status(204).json({ message: 'Grade deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = removeGrade;
