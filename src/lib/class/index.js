const { Class } = require('../../model');
const { notFoundError } = require('../../utils/error');

const createClassService = async ({ name, room_number, class_schedule }) => {
  if (!name || !room_number || !class_schedule) {
    const error = new Error('Invalid Paramiters');
    error.status = 400;
    throw error;
  }

  const createdClass = new Class({ name, room_number, class_schedule });

  return await createdClass.save();
};

const findAllClassService = async ({
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

  return Class.find(filter)
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);
};

const classCountService = ({ search }) => {
  const fileter = {
    name: { $regex: search, $options: 'i' },
  };

  return Class.count(fileter);
};

const updateClassService = async (
  id,
  { name, room_number, class_schedule }
) => {
  const classData = await Class.findById(id);

  if (!classData) {
    throw notFoundError();
  }

  const payload = {
    name,
    room_number,
    class_schedule,
  };

  Object.keys(payload).forEach((key) => {
    classData[key] = payload[key] ?? classData[key];
  });

  await classData.save();

  return classData._doc;
};

const removeClassService = async ({ id }) => {
  const classData = await Class.findById(id);

  if (!classData) {
    throw notFoundError();
  }

  return Class.findByIdAndDelete(id);
};

const findClassById = async (id) => {
  const hasClass = await Class.findById(id);
  return hasClass ? hasClass : false;
};

module.exports = {
  createClassService,
  findAllClassService,
  classCountService,
  updateClassService,
  removeClassService,
  findClassById,
};
