const { Class, Course } = require('../../model');

const createCourseService = async ({ name, description, course_schedule }) => {
  if (!name || !description || !course_schedule) {
    const error = new Error('Invalid Paramiters');
    error.status = 400;
    throw error;
  }

  const course = new Course({ name, description, course_schedule });

  return await course.save();
};

const findAllCourseService = async ({
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

  return Course.find(filter)
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);
};

const courseCountService = ({ search }) => {
  const fileter = {
    name: { $regex: search, $options: 'i' },
  };

  return Course.count(fileter);
};

const updateCourseService = async (
  id,
  { name, description, course_schedule }
) => {
  const course = await Course.findById(id);

  if (!course) {
    throw notFoundError();
  }

  const payload = {
    name,
    description,
    course_schedule,
  };

  Object.keys(payload).forEach((key) => {
    course[key] = payload[key] ?? course[key];
  });

  await course.save();

  return course._doc;
};

const removeclassService = async ({ id }) => {
  const classData = await Class.findById(id);

  if (!classData) {
    throw notFoundError();
  }

  return Class.findByIdAndDelete(id);
};

module.exports = {
  createCourseService,
  findAllCourseService,
  courseCountService,
  updateCourseService,
  removeclassService,
};
