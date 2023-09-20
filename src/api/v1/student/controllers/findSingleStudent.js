const { findSingleStudentService } = require('../../../../lib/student');

const findSingleStudent = async (req, res, next) => {
  const id = req.params.id;

  try {
    const student = await findSingleStudentService({ id });

    const response = {
      data: {
        ...student,
      },
      links: {
        self: req.path,
        user: `/students/${student._id}/user`,
        class: `/students/${student._id}/class`,
      },
    };

    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = findSingleStudent;
