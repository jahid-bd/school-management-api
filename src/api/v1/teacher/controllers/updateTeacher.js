const { updateOrCreateTeacherService } = require('../../../../lib/Teacher');

const updateTeacher = async (req, res, next) => {
  const { id } = req.params;

  try {
    const { teacher, code } = await updateOrCreateTeacherService(id, req.body);

    const response = {
      code,
      message:
        code === 201
          ? 'Teacher created successfully'
          : 'Teacher updated successfully',
      data: teacher,
      links: req.path,
    };

    res.status(code).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = updateTeacher;
