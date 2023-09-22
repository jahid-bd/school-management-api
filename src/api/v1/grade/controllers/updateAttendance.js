const { updateAttendanceService } = require('../../../../lib/attendance');
const { updateStudentPatchService } = require('../../../../lib/student');

const updateAttendance = async (req, res, next) => {
  const { id } = req.params;

  try {
    const attendance = await updateAttendanceService(id, req.body);

    const response = {
      code: 200,
      message: 'Attendance updated successfully',
      data: { ...attendance },
      links: {
        self: req.path,
      },
    };

    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = updateAttendance;
