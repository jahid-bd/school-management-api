const { updateTeacherPatchService } = require('../../../../lib/teacher');

const updateTeacherPatch = async (req, res, next) => {
  const { id } = req.params;

  try {
    const teacher = await updateTeacherPatchService(id, req.body);

    const response = {
      code: 200,
      message: 'Teacher updated successfully',
      data: { ...teacher },
      links: {
        self: req.path,
      },
    };

    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = updateTeacherPatch;
