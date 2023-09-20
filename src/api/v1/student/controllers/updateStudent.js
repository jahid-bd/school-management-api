const { updateOrCreateStudentService } = require('../../../../lib/student');

const updateStudent = async (req, res, next) => {
  const { id } = req.params;

  try {
    const { student, code } = await updateOrCreateStudentService(id, req.body);

    const response = {
      code,
      message:
        code === 201
          ? 'Student created successfully'
          : 'Student updated successfully',
      data: student,
      links: req.path,
    };

    res.status(code).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = updateStudent;
