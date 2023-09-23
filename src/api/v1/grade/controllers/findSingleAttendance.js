const { findSingleAttendanceService } = require('../../../../lib/attendance');
const { findSingleGradeService } = require('../../../../lib/grade');

const findSingleGrade = async (req, res, next) => {
  const id = req.params.id;

  try {
    const grade = await findSingleGradeService({ id });

    const response = {
      data: {
        ...grade,
      },
      links: {
        self: req.path,
        student: `/grades/${grade._id}/student`,
        class: `/grades/${grade._id}/class`,
      },
    };

    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = findSingleGrade;
