const { Schema, model } = require('mongoose');

const courseSchema = new Schema(
  {
    name: String,
    description: String,
    teacher_id: {
      type: Schema.ObjectId,
      ref: 'Teacher',
    },
    class_id: {
      type: Schema.ObjectId,
      ref: 'Class',
    },
  },
  {
    timeseries: true,
    id: true,
  }
);

const Course = model('Course', courseSchema);

module.exports = Course;
