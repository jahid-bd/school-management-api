const { removeAttendanceService } = require('../../../../lib/attendance');

const removeAttendance = async (req, res, next) => {
  const id = req.params.id;

  try {
    await removeAttendanceService({ id });

    res.status(204).json({ message: 'Attendance deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = removeAttendance;
