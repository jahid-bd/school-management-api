const { Student, Teacher } = require('../../model');
const { notFoundError } = require('../../utils/error');

const createTeacherService = async ({
  name,
  bio,
  photo,
  user_id,
  class_id,
  father_name,
  mother_name,
  address,
  phone,
  religion,
  birth,
  gender,
  joining_date,
}) => {
  if (!name || !user_id || !class_id || !gender || !birth) {
    const error = new Error('Invalid Paramiters!');
    error.status = 401;
    throw error;
  }

  const teacher = new Teacher({
    name,
    bio,
    photo,
    user_id,
    class_id,
    father_name,
    mother_name,
    address,
    phone,
    religion,
    birth,
    gender,
    joining_date,
  });

  return await teacher.save();
};

const findAllTeacherService = async ({
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

  return Teacher.find(filter)
    .populate({ path: 'class_id', select: 'name' })
    .populate({ path: 'user_id', select: '_id', select: 'email' })
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);
};

const removeTeacherService = async ({ id }) => {
  const teacher = await Teacher.findById(id);

  if (!teacher) {
    throw notFoundError();
  }

  return Teacher.findByIdAndDelete(id);
};

const teacherCountService = ({ search }) => {
  const fileter = {
    name: { $regex: search, $options: 'i' },
  };

  return Teacher.count(fileter);
};

const findSingleTeacherService = async ({ id }) => {
  const teacher = await Teacher.findById(id)
    .populate({ path: 'user_id' })
    .populate({ path: 'class_id' });

  if (!teacher) {
    throw notFoundError();
  }

  return teacher._doc;
};

const updateTeacherPatchService = async (
  id,
  {
    name,
    bio,
    photo,
    class_id,
    father_name,
    mother_name,
    address,
    phone,
    religion,
    birth,
    gender,
    joining_date,
    enrollment_status,
  }
) => {
  const teacher = await Teacher.findById(id);

  if (!teacher) {
    throw notFoundError();
  }

  const payload = {
    name,
    bio,
    photo,
    class_id,
    father_name,
    mother_name,
    address,
    phone,
    religion,
    birth,
    gender,
    joining_date,
    enrollment_status,
  };

  Object.keys(payload).forEach((key) => {
    teacher[key] = payload[key] ?? teacher[key];
  });

  await teacher.save();

  return teacher._doc;
};

const updateOrCreateTeacherService = async (
  id,
  {
    name,
    bio,
    photo,
    user_id,
    class_id,
    father_name,
    mother_name,
    address,
    phone,
    religion,
    birth,
    gender,
    joining_date,
  }
) => {
  const teacher = await Teacher.findById(id);

  if (!teacher) {
    const teacher = await createTeacherService({
      name,
      bio,
      photo,
      user_id,
      class_id,
      father_name,
      mother_name,
      address,
      phone,
      religion,
      birth,
      gender,
      joining_date,
    });

    return {
      teacher,
      code: 201,
    };
  }

  const payload = {
    name,
    bio,
    photo,
    user_id,
    class_id,
    father_name,
    mother_name,
    address,
    phone,
    religion,
    birth,
    gender,
    joining_date,
  };

  teacher.overwrite(payload);
  await teacher.save();

  return {
    teacher: { ...teacher._doc },
    code: 200,
  };
};

module.exports = {
  createTeacherService,
  findAllTeacherService,
  teacherCountService,
  findSingleTeacherService,
  updateOrCreateTeacherService,
  updateTeacherPatchService,
  removeTeacherService,
};
