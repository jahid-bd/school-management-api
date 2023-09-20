const { Schema, model } = require('mongoose');

const gradeSchema = new Schema(
  {
    assessment_name: String,
    assessment_type: {
      type: String,
      enum: ['exam', 'assignment', 'quiz'],
      default: 'exam',
    },
    date: Date,
    score: Number,
    max_score: Number,
    class_id: {
      type: Schema.ObjectId,
      ref: 'Class',
    },
    student_id: {
      type: Schema.ObjectId,
      ref: 'Student',
    },
    course_id: {
      type: Schema.ObjectId,
      ref: 'Course',
    },
  },
  { timestamps: true, id: true }
);

const Grade = model('Grade', gradeSchema);

module.exports = Grade;
