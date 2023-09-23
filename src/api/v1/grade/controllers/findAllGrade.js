const { attendanceCountService } = require('../../../../lib/attendance');
const {
  findAllGradeService,
  gradeCountService,
} = require('../../../../lib/grade');

const query = require('../../../../utils/query');

const findAllGrade = async (req, res, next) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const sortType = req.query.sort_type || 'dsc';
  const sortBy = req.query.sort_by || 'updatedAt';

  const assessment_type = req.query.assessment_type;
  const class_id = req.query.class_id;
  const student_id = req.query.student_id;
  const course_id = req.query.course_id;
  const grade_date = req.query.grade_date;

  try {
    // find
    const data = await findAllGradeService({
      class_id,
      student_id,
      course_id,
      grade_date,
      page,
      limit,
      sortType,
      sortBy,
      assessment_type,
    });

    // pagination
    const totalItems = await gradeCountService({
      class_id,
      student_id,
      course_id,
      grade_date,
      assessment_type,
    });
    const pagination = query.getPagination({ limit, page, totalItems });

    // HEATOAS links
    const links = query.getHATEOASForAllItems({
      url: req.url,
      path: req.path,
      query: req.query,
      hasNext: !!pagination.next,
      hasPrev: !!pagination.prev,
      page,
    });

    res.status(200).json({ data, pagination, links });
  } catch (err) {
    next(err);
  }
};

module.exports = findAllGrade;
