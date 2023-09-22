const { Student, Attendance } = require('../../model');
const { notFoundError } = require('../../utils/error');

const createAttendanceService = async ({
  name,
  class_id,
  student_id,
  date,
  status,
}) => {
  if (!name || !class_id || !student_id || !date || !status) {
    const error = new Error('Invalid Paramiters!');
    error.status = 401;
    throw error;
  }

  const attendance = new Attendance({
    name,
    class_id,
    student_id,
    date,
    status,
  });

  return await attendance.save();
};

const findAllAttendanceService = async ({
  page,
  limit,
  sortType,
  sortBy,
  search,
}) => {
  const sortStr = `${sortType === 'dsc' ? '-' : ''}${sortBy}`;
  const filter = {
    name: { $regex: search, $options: 'i' },
  };

  return Student.find(filter)
    .populate({ path: 'class_id', select: 'name' })
    .populate({ path: 'user_id', select: '_id', select: 'email' })
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

const AttendanceCountService = ({ search }) => {
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

const updateOrCreateStudentService = async (
  id,
  {
    name,
    bio,
    photo,
    user_id,
    class_id,
    class_roll,
    father_name,
    mother_name,
    address,
    phone,
    religion,
    birth,
    gender,
  }
) => {
  const student = await Student.findById(id);

  if (!student) {
    const student = await createStudentService({
      name,
      bio,
      photo,
      user_id,
      class_id,
      class_roll,
      father_name,
      mother_name,
      address,
      phone,
      religion,
      birth,
      gender,
    });

    return {
      student,
      code: 201,
    };
  }

  const payload = {
    name,
    bio,
    photo,
    user_id,
    class_id,
    class_roll,
    father_name,
    mother_name,
    address,
    phone,
    religion,
    birth,
    gender,
  };

  student.overwrite(payload);
  await student.save();

  return {
    student: { ...student._doc },
    code: 200,
  };
};

module.exports = {
  findSingleAttendanceService,
  updateAttendanceService,
  createAttendanceService,
  removeAttendanceService,
};
