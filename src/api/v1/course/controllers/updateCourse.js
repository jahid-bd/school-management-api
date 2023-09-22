const { updateCourseService } = require('../../../../lib/course');

const updateCourse = async (req, res, next) => {
  const { id } = req.params;

  try {
    const course = await updateCourseService(id, req.body);

    const response = {
      code: 200,
      message: 'Course updated successfully',
      data: { ...course },
      links: {
        self: req.path,
      },
    };

    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = updateCourse;
