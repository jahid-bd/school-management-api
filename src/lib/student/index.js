const { Student } = require('../../model');
const { notFoundError, badRequest } = require('../../utils/error');
const refIdValidation = require('../../utils/refIdValidation');

const createStudentService = async ({
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
  courses,
}) => {
  if ((!name || !user_id || !class_id || !class_roll || !gender, !birth)) {
    const error = new Error('Invalid Paramiters!');
    error.status = 401;
    throw error;
  }

  await refIdValidation('user', user_id);

  await refIdValidation('class', class_id);

  const validationPromises = courses.map(async (id) => {
    await refIdValidation('course', id);
  });

  await Promise.all(validationPromises);

  const student = new Student({
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
    courses,
  });

  return await student.save();
};

const findAllStudentService = async ({
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

const removeStudentService = async ({ id }) => {
  const student = await Student.findById(id);

  if (!student) {
    throw notFoundError();
  }

  return Student.findByIdAndDelete(id);
};

const studentCountService = ({ search }) => {
  const fileter = {
    name: { $regex: search, $options: 'i' },
  };

  return Student.count(fileter);
};

const findSingleStudentService = async ({ id }) => {
  const student = await Student.findById(id)
    .populate({ path: 'user_id' })
    .populate({ path: 'class_id' })
    .populate({ path: 'courses' });

  if (!student) {
    throw notFoundError();
  }

  return student._doc;
};

const updateStudentPatchService = async (
  id,
  {
    name,
    bio,
    photo,
    class_id,
    class_roll,
    father_name,
    mother_name,
    address,
    phone,
    religion,
    birth,
    gender,
    enrollment_status,
  }
) => {
  const student = await Student.findById(id);

  if (!student) {
    throw notFoundError();
  }

  const payload = {
    name,
    bio,
    photo,
    class_id,
    class_roll,
    father_name,
    mother_name,
    address,
    phone,
    religion,
    birth,
    gender,
    enrollment_status,
  };

  Object.keys(payload).forEach((key) => {
    student[key] = payload[key] ?? student[key];
  });

  await student.save();

  return student._doc;
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
  createStudentService,
  findAllStudentService,
  studentCountService,
  removeStudentService,
  findSingleStudentService,
  updateStudentPatchService,
  updateOrCreateStudentService,
};
