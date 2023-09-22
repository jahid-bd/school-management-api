const { Attendance, Grade } = require('../../model');
const { notFoundError } = require('../../utils/error');

const createGradeService = async ({
  assessment_name,
  assessment_type,
  class_id,
  student_id,
  course_id,
  score,
  max_score,
  grade_date,
}) => {
  if (
    !assessment_name ||
    !assessment_type ||
    !class_id ||
    !student_id ||
    !class_id ||
    !course_id ||
    !score ||
    !max_score ||
    !grade_date
  ) {
    const error = new Error('Invalid Paramiters!');
    error.status = 401;
    throw error;
  }

  const grade = new Grade({
    assessment_name,
    assessment_type,
    class_id,
    student_id,
    course_id,
    score,
    max_score,
    grade_date,
  });

  return await grade.save();
};

const findAllAttendanceService = async ({
  class_id,
  student_id,
  date,
  page,
  limit,
  sortType,
  sortBy,
  search,
}) => {
  const sortStr = `${sortType === 'dsc' ? '-' : ''}${sortBy}`;
  const filter = {};

  if (class_id) {
    filter.class_id = class_id;
  }
  if (student_id) {
    filter.student_id = student_id;
  }
  if (date) {
    filter.date = new Date(date);
  }

  if (search) {
    filter.name = { $regex: search, $options: 'i' };
  }

  return Attendance.find(filter)
    .populate({ path: 'class_id', select: '_id', select: 'name' })
    .populate({ path: 'student_id', select: '_id', select: 'name' })
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);
};

const removeAttendanceService = async ({ id }) => {
  const attendance = await Attendance.findById(id);

  if (!attendance) {
    throw notFoundError();
  }

  return Attendance.findByIdAndDelete(id);
};

const attendanceCountService = ({ search }) => {
  const fileter = {
    name: { $regex: search, $options: 'i' },
  };

  return Attendance.count(fileter);
};

const findSingleAttendanceService = async ({ id }) => {
  const attendance = await Attendance.findById(id)
    .populate({ path: 'student_id', select: '_id', select: 'name' })
    .populate({ path: 'class_id', select: '_id', select: 'name' });

  if (!attendance) {
    throw notFoundError();
  }

  return attendance._doc;
};

const updateAttendanceService = async (
  id,
  { name, class_id, student_id, date, status }
) => {
  const attendance = await Attendance.findById(id);

  if (!attendance) {
    throw notFoundError();
  }

  const payload = {
    name,
    class_id,
    student_id,
    date,
    status,
  };

  Object.keys(payload).forEach((key) => {
    attendance[key] = payload[key] ?? attendance[key];
  });

  await attendance.save();

  return attendance._doc;
};

module.exports = {
  createGradeService,
};
