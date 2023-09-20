const { findSingleTeacherService } = require('../../../../lib/Teacher');

const findSingleTeacher = async (req, res, next) => {
  const id = req.params.id;

  try {
    const teacher = await findSingleTeacherService({ id });

    const response = {
      data: {
        ...teacher,
      },
      links: {
        self: req.path,
        user: `/teachers/${teacher._id}/user`,
        class: `/teachers/${teacher._id}/class`,
      },
    };

    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = findSingleTeacher;
