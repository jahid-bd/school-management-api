const { Student } = require('../../model');

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
}) => {
  if ((!name, !user_id, !class_id, !class_roll, !gender, !birth)) {
    const error = new Error('Invalid Paramiters!');
    error.status = 401;
    throw error;
  }

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
    .populate()
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);
};

module.exports = {
  createStudentService,
  findAllStudentService,
};
