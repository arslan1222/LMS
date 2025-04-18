import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
  lectureId: { type: String, required: true },
  lectureTitle: { type: String, required: true },
  lectureDuration: { type: Number, required: true },
  lectureUrl: { type: String, required: true },
  isPreviewFree: { type: Boolean, required: true },
  lectureOrder: { type: Number, required: true },
}, { _id: false });

const chapterSchema = new mongoose.Schema({
  chapterId: { type: String, required: true },
  chapterOrder: { type: Number, required: true },
  chapterTitle: { type: String, required: true },
  chapterContent: [lectureSchema],
}, { _id: false });

const courseSchema = new mongoose.Schema({
  courseTitle: { type: String, required: true },
  courseDescription: { type: String, required: true },
  coursePrice: { type: Number, required: true },
  courseThumbnail: { type: String },
  isPublished: { type: Boolean, required: true },
  discount: { type: Number, required: true, min: 0, max: 100 },
  courseContent: [chapterSchema],

  // Changed from ObjectId to String
  courseRatings: [
    {
      userId: { type: String, ref: 'User' }, // custom string ID
      rating: { type: Number, min: 1, max: 5 }
    }
  ],

  // Already a string — good for custom IDs
  educator: { type: String, ref: 'User', required: true },

  // Changed from ObjectId to String
  enrolledStudents: [
    { type: String, ref: 'User' } // custom string IDs
  ]
}, { timestamps: true, minimize: false });

const Course = mongoose.model("Course", courseSchema);
export default Course;
