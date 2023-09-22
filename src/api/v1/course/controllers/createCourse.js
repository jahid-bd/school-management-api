const { createCourseService } = require('../../../../lib/course');

const createCourse = async (req, res, next) => {
  const { name, description, course_schedule } = req.body;

  try {
    const data = await createCourseService({
      name,
      description,
      course_schedule,
    });

    const response = {
      code: 201,
      message: 'Curse Created Successfully',
      data,
      links: req.path,
    };

    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = createCourse;
