const { createStudentService } = require('../../../../lib/student');

const createStudent = async (req, res, next) => {
  const {
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
  } = req.body;

  try {
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
      courses,
    });

    const response = {
      code: 201,
      message: 'Student created successfully',
      data: {
        ...student._doc,
      },
      links: {
        self: `/students/${student.id}`,
        user: `/students/${student.id}/user`,
      },
    };

    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = createStudent;
