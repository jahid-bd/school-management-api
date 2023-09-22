const { updateClassService } = require('../../../../lib/class');

const updateClass = async (req, res, next) => {
  const { id } = req.params;

  try {
    const updatedClass = await updateClassService(id, req.body);

    const response = {
      code: 200,
      message: 'Class updated successfully',
      data: { ...updatedClass },
      links: {
        self: req.path,
      },
    };

    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = updateClass;
