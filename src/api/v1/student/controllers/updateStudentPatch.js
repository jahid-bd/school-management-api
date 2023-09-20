const { updateStudentPatchService } = require('../../../../lib/student');

const updateStudentPatch = async (req, res, next) => {
  const { id } = req.params;

  try {
    const student = await updateStudentPatchService(id, req.body);

    const response = {
      code: 200,
      message: 'Student updated successfully',
      data: { ...student },
      links: {
        self: req.path,
      },
    };

    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = updateStudentPatch;
