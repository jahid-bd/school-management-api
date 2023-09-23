const { Schema, model } = require('mongoose');

const classSchema = new Schema(
  {
    name: String,
    room_number: String,
    class_schedule: String,
    courses: [{ type: Schema.ObjectId, ref: 'Course' }],
  },
  {
    timeseries: true,
    id: true,
  }
);

const Class = model('Class', classSchema);

module.exports = Class;
