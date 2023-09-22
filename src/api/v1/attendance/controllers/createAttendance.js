const { createAttendanceService } = require('../../../../lib/attendance');

const createAttendance = async (req, res, next) => {
  const { name, class_id, student_id, date, status } = req.body;

  try {
    const attendance = await createAttendanceService({
      name,
      class_id,
      student_id,
      date,
      status,
    });

    const response = {
      code: 201,
      message: 'Attendance created successfully',
      data: {
        ...attendance._doc,
      },
      links: {
        self: `/attendance/${attendance.id}`,
        student: `/attendance/${attendance.id}/student`,
      },
    };

    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = createAttendance;
