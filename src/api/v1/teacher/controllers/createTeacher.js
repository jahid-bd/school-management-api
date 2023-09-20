const { createTeacherService } = require('../../../../lib/Teacher');

const createTeacher = async (req, res, next) => {
  const {
    name,
    bio,
    photo,
    user_id,
    class_id,
    father_name,
    mother_name,
    address,
    phone,
    religion,
    birth,
    gender,
    joining_date,
  } = req.body;

  try {
    const teacher = await createTeacherService({
      name,
      bio,
      photo,
      user_id,
      class_id,
      father_name,
      mother_name,
      address,
      phone,
      religion,
      birth,
      gender,
      joining_date,
    });

    const response = {
      code: 201,
      message: 'Teacher created successfully',
      data: {
        ...teacher._doc,
      },
      links: {
        self: `/teachers/${teacher.id}`,
        user: `/teachers/${teacher.id}/user`,
      },
    };

    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = createTeacher;
