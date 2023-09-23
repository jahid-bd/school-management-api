const { Schema, model } = require('mongoose');

const teacherSchema = new Schema(
  {
    name: String,
    photo: String,
    bio: String,
    user_id: {
      type: Schema.ObjectId,
      ref: 'User',
    },
    class_id: {
      type: Schema.ObjectId,
      ref: 'Class',
    },
    enrollment_status: {
      type: String,
      enum: ['active', 'inactive', 'retired'],
      default: 'active',
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'others'],
    },
    courses: [{ type: Schema.ObjectId, ref: 'Course' }],
    classes: [{ type: Schema.ObjectId, ref: 'Class' }],
    father_name: String,
    mother_name: String,
    birth: Date,
    joining_date: Date,
    religion: String,
    class_roll: Number,
    address: String,
    phone: String,
  },
  { timestamps: true, id: true }
);

const Teacher = model('Teacher', teacherSchema);

module.exports = Teacher;
