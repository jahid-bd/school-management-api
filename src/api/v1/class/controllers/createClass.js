const { createClassService } = require('../../../../lib/class');

const createClass = async (req, res, next) => {
  const { name, room_number, class_schedule } = req.body;

  try {
    const data = await createClassService({
      name,
      room_number,
      class_schedule,
    });

    const response = {
      code: 201,
      message: 'Class Created Successfully',
      data,
      links: req.path,
    };

    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = createClass;
