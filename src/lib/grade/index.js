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

const findAllGradeService = async ({
  class_id,
  student_id,
  course_id,
  grade_date,
  page,
  limit,
  sortType,
  sortBy,
  assessment_type,
}) => {
  const sortStr = `${sortType === 'dsc' ? '-' : ''}${sortBy}`;
  const filter = {};

  if (class_id) {
    filter.class_id = class_id;
  }
  if (student_id) {
    filter.student_id = student_id;
  }
  if (course_id) {
    filter.course_id = course_id;
  }
  if (grade_date) {
    filter.grade_date = new Date(grade_date);
  }
  if (assessment_type) {
    filter.assessment_type = assessment_type;
  }

  return Grade.find(filter)
    .populate({ path: 'class_id', select: '_id', select: 'name' })
    .populate({ path: 'student_id', select: '_id', select: 'name' })
    .populate({ path: 'course_id', select: '_id', select: 'name' })
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);
};

const removeGradeService = async ({ id }) => {
  const grade = await Grade.findById(id);

  if (!grade) {
    throw notFoundError();
  }

  return Grade.findByIdAndDelete(id);
};

const gradeCountService = (filter) => {
  const gradeFilter = {};

  if (filter.class_id) {
    gradeFilter.class_id = filter.class_id;
  }

  if (filter.student_id) {
    gradeFilter.student_id = filter.student_id;
  }

  if (filter.course_id) {
    gradeFilter.course_id = filter.course_id;
  }

  if (filter.grade_date) {
    gradeFilter.grade_date = { $eq: filter.grade_date };
  }

  if (filter.assessment_type) {
    gradeFilter.assessment_type = filter.assessment_type;
  }

  return Grade.count(gradeFilter);
};

const findSingleGradeService = async ({ id }) => {
  const grade = await Grade.findById(id)
    .populate({ path: 'student_id', select: '_id', select: 'name' })
    .populate({ path: 'class_id', select: '_id', select: 'name' })
    .populate({ path: 'course_id', select: '_id', select: 'name' });

  if (!grade) {
    throw notFoundError();
  }

  return grade._doc;
};

const updateGradeService = async (
  id,
  {
    assessment_name,
    assessment_type,
    class_id,
    student_id,
    course_id,
    score,
    max_score,
    grade_date,
  }
) => {
  const grade = await Grade.findById(id);

  if (!grade) {
    throw notFoundError();
  }

  const payload = {
    assessment_name,
    assessment_type,
    class_id,
    student_id,
    course_id,
    score,
    max_score,
    grade_date,
  };

  Object.keys(payload).forEach((key) => {
    grade[key] = payload[key] ?? grade[key];
  });

  await grade.save();

  return grade._doc;
};

module.exports = {
  createGradeService,
  findSingleGradeService,
  gradeCountService,
  updateGradeService,
  removeGradeService,
  findAllGradeService,
};
