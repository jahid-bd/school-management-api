const { findSingleAttendanceService } = require('../../../../lib/attendance');

const findSingleAttendance = async (req, res, next) => {
  const id = req.params.id;

  try {
    const attendance = await findSingleAttendanceService({ id });

    const response = {
      data: {
        ...attendance,
      },
      links: {
        self: req.path,
        student: `/attendance/${attendance._id}/student`,
        class: `/attendance/${attendance._id}/class`,
      },
    };

    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = findSingleAttendance;
