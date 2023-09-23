const { updateGradeService } = require('../../../../lib/grade');

const updateGrade = async (req, res, next) => {
  const { id } = req.params;

  try {
    const grade = await updateGradeService(id, req.body);

    const response = {
      code: 200,
      message: 'Grade updated successfully',
      data: { ...grade },
      links: {
        self: req.path,
      },
    };

    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = updateGrade;
