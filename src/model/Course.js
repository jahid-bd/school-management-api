const { Schema, model } = require('mongoose');

const courseSchema = new Schema(
  {
    name: String,
    description: String,
    course_schedule: String,
  },
  { timestamps: true, id: true }
);

const Course = model('Course', courseSchema);

module.exports = Course;
