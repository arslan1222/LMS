import express from 'express'
import { getUserCourseProgress, getUserData, purchaseCourse, updateUserCourseProgress, userEnrolledCourses, userRatings } from '../controllers/user.controller.js';

const userRouter = express.Router();


userRouter.get('/data', getUserData);
userRouter.get('/enrolled-courses', userEnrolledCourses);
userRouter.post('/purchase', purchaseCourse);
userRouter.post('/update-course-progress', updateUserCourseProgress);
userRouter.post('/get-course-progress', getUserCourseProgress);
userRouter.post('/add-rating', userRatings);



export default userRouter;