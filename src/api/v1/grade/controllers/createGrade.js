const { createGradeService } = require('../../../../lib/grade');

const createGrade = async (req, res, next) => {
  const {
    assessment_name,
    assessment_type,
    class_id,
    student_id,
    course_id,
    score,
    max_score,
    grade_date,
  } = req.body;

  try {
    const grade = await createGradeService({
      assessment_name,
      assessment_type,
      class_id,
      student_id,
      course_id,
      score,
      max_score,
      grade_date,
    });

    const response = {
      code: 201,
      message: 'Grade created successfully',
      data: {
        ...grade._doc,
      },
      links: {
        self: `/grades/${grade.id}`,
        student: `/grades/${grade.id}/student`,
      },
    };

    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = createGrade;
